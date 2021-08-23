const $userNum = document.getElementById("userNumInput");
const $submitBtn = document.getElementById("submitBtn");
const $generateBtn = document.getElementById("generateBtn");
const $modalContainer = document.getElementById("modalContainer");
const $soloBtn = document.getElementById("soloBtn");
const $comBtn = document.getElementById("comBtn");
const $match = document.querySelectorAll(".match");
const realArr=[]; //유저가 맞춰야 할 숫자
let userRealArr=[]; //컴퓨터가 맞춰야 할 숫자
const userNumList=[];
const comAnswer=[];
const tenNums=[...Array(10).keys()];
const allList=[];
let copyList;
for(let i1 in tenNums) // 완전 탐색
    if(i1 != 0)
        for(let i2 in tenNums){
            if (i2 != i1)
                for(i3 in tenNums)
                    if(i3 != i1 && i3 != i2){
                        allList.push([+i1,+i2,+i3]);
                    }
    }       
let count;
let flag = false;
let comFinalAnswer = [];


$soloBtn.addEventListener("click",()=>{
    flag = false;
    for(let i = 0 ; i < $match.length ; i++) {
        $match[i].style.display="none";
    }

    document.body.style.background="white";
    $soloBtn.style.background="#c3c3c3";
    $comBtn.style.background="#f0f0f0";
});

$comBtn.addEventListener("click",()=>{
    flag = true;
    for(let i = 0 ; i < $match.length ; i++) {
        $match[i].style.display="block";
    }
    document.body.style.background="rgb(246 224 37)";
    document.querySelector(".vs").style.display="flex";
    $comBtn.style.background="#c3c3c3";
    $soloBtn.style.background="#f0f0f0";

});

$generateBtn.addEventListener('click',()=>{
    count = 1;
    realArr.length=0;
    userNumList.length=0;

    generateNumber();
    startGame();
});

$userNum.addEventListener("keydown",function(e){
    let key = e.keyCode;
    
    if((key>31 && key<48) || key>57){ // 48~57이 ascii 0-9           
        fadeIn("숫자만 적을 수 있습니다.");
    }else if($userNum.value.length===0 && key===48){
        fadeIn("첫번째는 0이 올 수 없습니다.");
    }
    
});

$modalContainer.addEventListener("click",()=>{
    fadeOut();
});

$submitBtn.addEventListener("click",()=>{
    judgeValues();
});

$userNum.addEventListener("keydown",(e)=>{
    if(e.keyCode === 13){
        judgeValues();
    }
})

const generateNumber = ()=>{
    const temArr = [...Array(10).keys()];

    for(let i = 0 ; i <3 ; i++){
        let ranIdx = Math.floor(Math.random()*temArr.length);

        if(i === 0 && ranIdx === 0) ranIdx++;                

        realArr.push(temArr.splice(ranIdx,1)[0]);
    }// end of for loop
    
    console.log("사용자가 맞춰야 할 정답->",realArr);
}

onkeydown = (e) => {
    if(e.target!==$userNum){
        setTimeout(()=>{
            fadeOut()
        },0); 
    }
}

const fadeIn = (str)=>{
    $userNum.blur();
    document.getElementById("warningText").innerText=str;
    $modalContainer.style.visibility="visible";
    $modalContainer.style.opacity="1";
}

const fadeOut = ()=>{
    $modalContainer.style.visibility="hidden";
    $modalContainer.style.opacity="0";
    $userNum.focus();
}

const startGame = ()=>{
    
    if(flag){
        copyList=[...allList];
        $userNum.placeholder="컴퓨터가 맞출 번호를 입력!";
    }

    document.getElementById("ranNum").style.display="none";
    document.getElementById("userNum").style.display="block";
    document.getElementById("resultList").innerHTML="";
    document.getElementById("comResultList").innerHTML="";
    document.getElementById("counter").innerText="";
    document.getElementById("ballCounter").innerText="";
    
}

const restartGame = (str)=>{
    copyList = allList;
    userRealArr=[];
    fadeIn(str);
    document.getElementById("ranNum").style.display="block";
    document.getElementById("userNum").style.display="none";
}

const judgeValues = ()=>{
    const tempArr = $userNum.value.split("");
    const strArr = tempArr.map(i=>Number(i));
    const set = new Set(strArr);
    const result = {strike:0,ball:0}

    if($userNum.value.length !== 3){
        fadeIn("3자리 숫자를 입력해 주세요.");
        return;
    }
                   
    if(set.size !== 3){
        fadeIn("중복되지 않는 숫자를 입력해 주세요.");
        return;
    }

    if(userNumList.includes($userNum.value)){
        fadeIn("이미 입력한 적 있는 숫자입니다.");
        return;
    }

    if(flag === true && userRealArr.length === 0){
        for(let i = 0; i < $userNum.value.length ; i++){
            userRealArr.push(+$userNum.value[i]);
        }

        $userNum.value="";
        $userNum.placeholder="3자리 숫자를 입력해 주세요";
        return;    
    }

    calculateResult(strArr,result,"user");

    userNumList.push($userNum.value);


    document.getElementById("ballCounter").innerText=`🔵Strike : ${result.strike} / 🔴Ball : ${result.ball}`
    document.getElementById("counter").innerText=`${count}회차`
    document.getElementById("resultList").innerHTML=
               `<tr ${result.strike===3 && "style='background:#ffeb3b'"}>
                    <td>${count}</td>
                    <td>${$userNum.value}</td>
                    <td>
                        <p>🔵Strike : ${result.strike}</p>
                        <p>🔴Ball : ${result.ball}</p>
                    </td>
                </tr>` 
                + document.getElementById("resultList").innerHTML;
    
    count++
    if(result.strike===3){
        restartGame('게임에서 승리하셨습니다!🎉');
    }
    else if(count>9 && !flag){
        restartGame(`패배하셨습니다.. 정답은 ${realArr.join("")}입니다.`);
    }
    
    $userNum.value="";
    
    if(flag)
    setTimeout(judgeUserNumber,1000);

}

const calculateResult = (numArr,result,player) =>{
    const temArr = player === "user" ? realArr : userRealArr ;

    if(player==="computer"){
        console.log("컴퓨터 맞춰야할 숫자",temArr);
        console.log("가져온 숫자",numArr);
    }

    for(let i = 0 ; i<numArr.length ; i++){     

        for(let j = 0 ; j < temArr.length ; j++){
            
            if(numArr[i] === temArr[j])  i === j ? result.strike++ : result.ball++;
        }// end of for loop
    }// end of for loop
}

const judgeUserNumber = () => {

    const randomChoice = copyList[Math.ceil(Math.random()*copyList.length)-1]; // 모든 경우의 수 배열
    const result = {strike:0, ball:0};
    
    calculateResult(randomChoice,result,"computer"); // strike ball여부 체크
    
    if(result.strike===3){
        restartGame(`컴퓨터가 정답을 맞췄습니다! \n 당신의 정답은 ${realArr.join("")}입니다.`);
    }

    for(let a = 0 ; a < copyList.length ; a++){
        let strNum=0;
        let ballNum=0;

        for (let b = 0 ; b < 3 ; b++){
            for(let c = 0 ; c < 3 ; c++){
                if (randomChoice[c] === copyList[a][b] && b === c) strNum++;
                if (randomChoice[c] === copyList[a][b] && b !== c) ballNum++;
            }
        }

        if (strNum !== result.strike || ballNum !== result.ball) copyList.splice(a,1);
    }
    console.log(copyList);

    document.getElementById("comResultList").innerHTML=
    `<tr ${result.strike===3 && "style='background:#ffeb3b'"}>
         <td>${count-1}</td>
         <td>${randomChoice.join("")}</td>
         <td>
             <p>🔵Strike : ${result.strike}</p>
             <p>🔴Ball : ${result.ball}</p>
         </td>
     </tr>` 
     + document.getElementById("comResultList").innerHTML;
}

