// imports
var fs = require('fs'),
    path = require('path'),
    marked = require('marked'),
    _ = require('underscore');

// markdown options
var renderer = new marked.Renderer();
/*renderer.code = function (code, lang) {
    var html = '<pre class="line-numbers" data-start=1>';
    html += '<code class="' + getClass(lang) + '">';
    html += code;
    html += '</code></pre>';
    return html;
};*/

marked.setOptions({
  renderer: renderer
});

// consts
var SRC = __dirname + '/src/';
var TEMP = __dirname + '/temp/';
var DATA = __dirname + '/' + (process.argv[2] || 'lessons') + '/';
var OUTPUT = __dirname + '/www/index.html';

console.log('Processing lessons in ' + (process.argv[2] || 'lessons'));

// helpers
/* used for Prism.js, gets the appropriate class for a given language of md */
function getClass(lang) {
  // first fix for cases where Prism's naming differs from markdown
  if(lang === undefined) {
    lang = 'clike';
  } else if(lang === 'js') {
    lang = 'javascript';
  } else if(lang === 'html') {
    lang = 'markup';
  }

  return 'language-' + lang;
}
/* Gets a last of directories in a directory */
function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function getFiles(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return !fs.statSync(path.join(srcpath, file)).isDirectory() && file.substring(0,1) != '.';
  });
}

/* reads a src file */
function readSrcFile(name) {
  return fs.readFileSync(SRC + name + '.html').toString();
}

/* takes a file url and returns the name of the lesson contained within */
function stripName(url) {
  var components = url.split('/');
  var last = components[components.length - 1];
  components = last.split('.');
  if(components.length > 1) {
    components.pop();
  }
  var withNum = components.join('.');
  // check for an order identifier (##)
  if(withNum.substring(0,1) === '(' && withNum.indexOf(')') != -1) {
    return withNum.substring(withNum.indexOf(')') + 1);
  } else {
    return withNum;
  }
}

/* Finds a file url's order number [ '(##)' ] */
function getOrderNum(url) {
  var components = url.split('/');
  var last = components[components.length - 1];
  components = last.split('.');
  if(components.length > 1) {
    components.pop();
  }
  var withNum = components.join('.');
  // check for an order identifier (##)
  if(withNum.substring(0,1) === '(' && withNum.indexOf(')') != -1) {
    var num = withNum.substring(1, withNum.indexOf(')'));
    return parseInt(num);
  } else {
    return 0;
  }
}

/* gets a file ext from a file url */
function getExt(url) {
  var components = url.split('.');
  return components[components.length - 1];
}

/* returns if a file extension is valid markdown */
function isMarkdown(ext) {
  var valid = ['md', 'markdown', 'mark', 'mdml', 'mdown', 'text', 'mdtext',
               'mdtxt', 'mdwn', 'mkd', 'mkdn'];

  for(var i = 0; i < valid.length; i++) {
    if(ext === valid[i]) {
      return true;
    }
  }
  return false;
}


/* Simple helper returns '<{type} id="{id}" class="{_class}">' */
function getTag(type, id, _class) {
  return '<' + type + ' id="' + id + '" class="' + _class + '">';
}

function getDiv(id, _class) {
  return getTag('div', id, _class);
}


/* The SUBSECTION constructor */
function SubSection(url, sectionNum, subsectionNum) {
  return {
    toHTML: function() {
      var result = '';
      result += getTag('span', 'sec-' + sectionNum + '-' + subsectionNum, 'anchor');
      result += '</span>'
      result += getDiv('', 'subgroup');
      result += '<h3>' + stripName(url) + '</h3>';
      
      var fileContents = fs.readFileSync(url).toString();
      var ext = getExt(url);
      if(ext === 'html') {
        // special HTML processing?
      } if(isMarkdown(ext)) {
        // parse the MARKDOWN
        fileContents = marked(fileContents);
      }
      result += fileContents;
      result += '</div>';

      return result;
    }
  };
}


/* The SECTION constructor */
function Section(name, subsections, sectionNum) {
  return {
    toHTML: function() {
      var result = '';
      result += getTag('span', 'sec-' + sectionNum, 'anchor');
      result += '</span>'
      result += getTag('section', '', 'group');
      result += '<div class="page-header"><h2>' + name + '</h2></div>';
      for(var i = 0; i < subsections.length; i++) {
        result += subsections[i].toHTML();
      }
      result += '</section>';

      return result;
    }
  };
}


/* The NAVGROUP constructor */
function NavGroup(name, subgroups, groupNum) {
  return {
    toHTML: function() {
      var result = '';
      result += '<li>';
      result += '<a href="#sec-' + groupNum + '">' + name + "</a>";
      result += '<ul class="nav nav-stacked">';

      for(var i = 0; i < subgroups.length; i++) {
        result += subgroups[i].toHTML();
      }

      result += '</ul></li>';
      return result;
    }
  };
}


/* The NAVSUBGROUP constructor */
function NavSubGroup(name, groupNum, subNum) {
  return {
    toHTML: function() {
      var result = '';
      result += '<li>';
      result += '<a href="#sec-' + groupNum + '-' + subNum + '">';
      result += name;
      result += '</a></li>';
      return result;
    }
  };
}


// little magic that actually constructs the page
console.log('Beginning compilation');
var sectionUrls = getDirectories(DATA).map(function (url) { return DATA + url; });
sectionUrls = _.sortBy(sectionUrls, function(url) { return getOrderNum(url); });

var sections = [];
var navGroups = [];

var i;
for(i = 0; i < sectionUrls.length; i++) {
  var num = i + 1;
  var sectionUrl = sectionUrls[i];
  console.log('Getting SECTION ' + num + ': ' + stripName(sectionUrl));

  var subSections = [];
  var subNavGroups = [];

  var subSectionUrls = getFiles(sectionUrl).map(function (url) { 
    return sectionUrl + '/' + url;
  });
  subSectionUrls = _.sortBy(subSectionUrls, function(url) { return getOrderNum(url); });

  for(var j = 0; j < subSectionUrls.length; j++) {
    var subNum = j + 1;
    var subSectionUrl = subSectionUrls[j];

    console.log(' |- Getting SUBSECTION ' + subNum + ': ' +
                stripName(subSectionUrl));
    
    subSections.push(SubSection(subSectionUrl, num, subNum));
    subNavGroups.push(NavSubGroup(stripName(subSectionUrl), num, subNum));
  }

  sections.push(Section(stripName(sectionUrl), subSections, num));
  navGroups.push(NavGroup(stripName(sectionUrl), subNavGroups, num));
}

console.log('\nComposing final HTML');
var finalHTML = readSrcFile('head') + readSrcFile('content-head');

for(i = 0; i < sections.length; i++) {
  finalHTML += sections[i].toHTML();
}

finalHTML += readSrcFile('content-tail') + readSrcFile('nav-head');

for(i = 0; i < navGroups.length; i++) {
  finalHTML += navGroups[i].toHTML();
}

finalHTML += readSrcFile('nav-tail') + readSrcFile('tail');

console.log('\nWriting file...\n');

fs.writeFile(OUTPUT, finalHTML, function(err) {
  if(err) {
    return console.log('ERROR: ' + err);
  }

  console.log('All set! :)');
}); 
