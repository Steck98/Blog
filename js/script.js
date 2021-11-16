'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector ='.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optCloudClassCount = 5;
const optCloudClassPrefix= 'tag-size-';

// !!!!!!!!!!!!!TITLE JS SECTION!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!TITLE JS SECTION!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!TITLE JS SECTION!!!!!!!!!!!!!!!!!
function titleClickHandler(event){
  event.preventDefault();  
  const clickedElement = this;
  console.log(clickedElement); 
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
   
  this.classList.add('active');
  
  const activeArticles = document.querySelectorAll('.post');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
 
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
  }

function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){
  const titleList = document.querySelector(optTitleListSelector);
  const articleId = article.getAttribute("id");
  const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    titleList.insertAdjacentHTML('beforeend',linkHTML)
  }
}
generateTitleLinks();

const links = document.querySelectorAll('.sidebar a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
  
}
//// !!!!!!!!!!!!!TAG JS SECTION!!!!!!!!!!!!!!!!!
//// !!!!!!!!!!!!!TAG JS SECTION!!!!!!!!!!!!!!!!!
//// !!!!!!!!!!!!!TAG JS SECTION!!!!!!!!!!!!!!!!!
function calculateTagClass( count, params){
const normalizedCount= count- params.min
const normalizedMax= params.max - params.min
const percentage=normalizedCount/normalizedMax
const classNumber = Math.floor( percentage * ( optCloudClassCount-1)+1);
const tagClass = optCloudClassPrefix+classNumber;
return tagClass
}
function generateTags(){
   /* [NEW] create a new variable allTags with an empty object */
   let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll('.post');
  /* START LOOP: for every article: */
for( let article of articles){
  /* find tags wrapper */
  const tagsList= article.querySelector(optArticleTagsSelector);
  /* make html variable with empty string */
  let innerTagText = ' ';
  /* get tags from data-tags attribute */
  const articleTags = article.getAttribute('data-tags');
  /* split tags into array */
  const articleTagsArray = articleTags.split(' ');
  /* START LOOP: for each tag */
for(let tag of articleTagsArray){
  /* generate HTML of the link */
  const tagText = '<li><a href=#tag-'+ tag + '>'+ tag +'</a></li>';
  /* add generated code to html variable */
  innerTagText += ' ' + tagText;
  /* [NEW] check if this link is NOT already in allTags */
  if(!allTags.hasOwnProperty(tag)){
    /* [NEW] add generated code to allTags array */
    allTags[tag]= 1;
  }else{
    allTags[tag]++;
  }
}
tagsList.insertAdjacentHTML("afterbegin",innerTagText);
/* END LOOP: for every article: */
}
/* [NEW] find list of tags in right column */
const tagList = document.querySelector('.tags');
const tagsParams= calculateTagsParams(allTags);
console.log('TagParams:',tagsParams);


  let allTagsHTML='';
  for( let tag in allTags ){
    
    const tagLinkHTML='<li>'+'<a class="'+ calculateTagClass(allTags[tag],tagsParams)+'"href=#tag-'+ tag + '>'+ tag +'.'+'</a></li>'; 
    console.log(tagLinkHTML);
    allTagsHTML += tagLinkHTML;
  }
  tagList.innerHTML = allTagsHTML;
console.log(allTags)

}

generateTags();
calculateTagsParams();
function calculateTagsParams (tags) {
 const params={
   max : 0,
   min:99999
  };
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times')
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }else if(tags[tag] < params.min){
        params.min = tags[tag]; 
    }
    console.log(tags[tag])
  }
  

return params
}
function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();  
  /* make new constant named "clickedElement" and give it the value of "this" */
const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
const href = clickedElement.getAttribute("href");
console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]')
  /* START LOOP: for each active tag link */
for ( let tagLink of tagLinks){
    /* remove class active */
tagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
}
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
for( let hrefTagLink of hrefTagLinks){
    /* add class active */7
hrefTagLink.classList.add('active')
  /* END LOOP: for each found tag link */
}
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();
//// !!!!!!!!!!!!!AUTHOR JS SECTION!!!!!!!!!!!!!!!!!
//// !!!!!!!!!!!!!AUTHOR JS SECTION!!!!!!!!!!!!!!!!!
//// !!!!!!!!!!!!!AUTHOR JS SECTION!!!!!!!!!!!!!!!!!
function generateAuthors(){
  const articles = document.querySelectorAll('.post');
  let authorConfirmArray=[];
  for( let article of articles){
    const authorList = article.querySelector(optArticleAuthorSelector);
    let innerAuthorText = '';
    const authorName = article.getAttribute('data-author')
    const authorNameName = '<a href=#Author-'+ authorName + '>'+ authorName +'</a></li>';
    innerAuthorText = '' + authorNameName;
    authorList.insertAdjacentHTML("afterbegin",innerAuthorText);
    const authorSideList = document.querySelector('.authors');
    if(!authorConfirmArray.includes(authorName)){
    authorConfirmArray.push(authorName); // Thats not what i was supposed to do, but it works :)  
    authorSideList.insertAdjacentHTML("afterbegin",'<li><a class="author"href=#Author-'+ authorName +'</a>'+authorName+' '+'</li>');
  }
    
}
}
 

  

    


generateAuthors();

function authorClickHandler(event){
event.preventDefault();
const clickedElement= this;
const href = clickedElement.getAttribute("href");
const author = href.replace('#Author-', '');
const authorLinks = document.querySelectorAll('a.active[href^="Author-"]')
for(let authorLink of authorLinks){
  authorLink.classList.remove('active');
}
const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
console.log(hrefAuthorLinks)
for(let hrefAuthorLink of hrefAuthorLinks){
hrefAuthorLink.classList.add('active')
}


generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthor(){
const authorLinks = document.querySelectorAll('[href^="#Author-"]');
for (let authorLink of authorLinks){
authorLink.addEventListener('click', authorClickHandler);

 }
} 
addClickListenersToAuthor();
