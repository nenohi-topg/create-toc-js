// ======================= 定数 =======================
const TOC_INSERT_TAG_ID = "#toc"; // tocを挿入するタグのID
// const HEADING_TAG = "h1,h2,h3,h4,h5,h6"; // 検索する見出しのタグ
const TOC_HEADER_CLASS_NAME = ".tocHeader"
const ID_NAME = "articleHeading"; // リンク作成用のID名(ここに数字を足して一意にする)
const TOC_A_CLASS_NAME = "tocLink"; // styleシート適用用
const LIST_TYPE = "ul" // Tocのリストの種類

// ======================= 変数 =======================
let IdSuffixNum = 0;

// ======================= 関数 =======================
// リンク作成用の関数
function createUniqueId () {
    return ID_NAME + String(IdSuffixNum++);
}

// <li><a>見出し</a></li>を返す関数
// headingEl : 見出しのhX要素
function createLink (headingEl) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    headingEl.id = createUniqueId();
    a.href = "#" + headingEl.id;
    a.innerText = headingEl.innerText;
    a.className = TOC_A_CLASS_NAME;
    li.appendChild(a);
    return li;
}

// Tocを作成する関数
// parentEl : Tocを追加する要素
// headingList : tocにするhXの配列
function createToc(parentEl, headingList){
    let preRank = 0;
    let liAddEl = null;
    if (parentEl === null) return;
    for(let i = 0; i < headingList.length; i++){
        let elRank = Number(headingList[i].tagName.substring(1)); // hXのX
        if (elRank >= preRank){
            if (liAddEl === null){ // 最初の処理
                liAddEl = document.createElement(LIST_TYPE);
                parentEl.appendChild(liAddEl); // tocを挿入する要素の子要素としてついか
                for (let j = 0; j < (elRank - preRank - 1); j++){
                    liAddEl.appendChild(document.createElement(LIST_TYPE));
                    liAddEl = liAddEl.lastElementChild;
                }
            }else{
                // liAddElは<li><a>見出し</a></li>を"子要素として追加する"ol(ul)要素
                // liAddElを的確に操作していく
                // 直前のhと操作の対称のhのランク差だけliAddElに<ul></ul>を追加して遷移
                for (let j = 0; j < (elRank - preRank); j++){
                    liAddEl.appendChild(document.createElement(LIST_TYPE));
                    liAddEl = liAddEl.lastElementChild;
                }
            }
        }else{
            // 直前のhと操作の対称のhのランク差だけliAddElを親要素の方向に遷移
            for (let j = 0; j < (preRank - elRank); j++){
                liAddEl = liAddEl.parentElement;
            }
            
        }
        // liを追加・直前のランクを更新
        liAddEl.appendChild(createLink(headingList[i]));
        preRank = elRank;
    }
}

// ======================= Main =======================
const tocInsertElement = document.querySelector(TOC_INSERT_TAG_ID);
//const headingElements = document.querySelectorAll(HEADING_TAG);
const headingElements = document.querySelectorAll(TOC_HEADER_CLASS_NAME);
// console.log(tocInsertElement);
// console.log(headingElements);
try{
    if(tocInsertElement)createToc(tocInsertElement, headingElements); 
}
catch (error){
    console.error(error);
}

//console.log(tocInsertElement);
//console.log(headingElements);
