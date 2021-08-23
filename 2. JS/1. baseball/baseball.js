const $userNum = document.getElementById("userNumInput");
const $submitBtn = document.getElementById("submitBtn");
const $generateBtn = document.getElementById("generateBtn");
const $modalContainer = document.getElementById("modalContainer");
const realArr=[];
const userNumList=[];
let count;

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
    
    console.log(realArr);
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
    document.getElementById("ranNum").style.display="none";
    document.getElementById("userNum").style.display="block";
    document.getElementById("resultList").innerHTML="";
    document.getElementById("counter").innerText="";
    document.getElementById("ballCounter").innerText="";
}

const restartGame = ()=>{
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

    for(let i = 0 ; i<strArr.length ; i++){     
       
        for(let j = 0 ; j < realArr.length ; j++){
            if(strArr[i] === realArr[j])  i === j ? result.strike++ : result.ball++;
        }// end of for loop
    }// end of for loop

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
        fadeIn('게임에서 승리하셨습니다!🎉');
        restartGame();
    }
    else if(count>9){
        fadeIn(`패배하셨습니다.. 정답은 ${realArr.join("")}입니다.`);
        restartGame();
    }

    $userNum.value="";
}
