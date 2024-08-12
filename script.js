
function displayvictory(val,d,check){
    let div = document.querySelector(".show-victory");
    div.style.visibility = "visible";
    if(check)
        div.innerHTML = `Player ${val} Wins`;
    else  
        div.innerHTML = "Tied!!"
    d.innerHTML="";
    let button = document.querySelector(".buttons");
    button.style.visibility="visible";
    button.querySelector("button").addEventListener('click',()=>{
        location.reload(true);
    })
    return;
}

function checkvictory(val,d) {
    let row = Array.from(document.querySelectorAll("#row"));
    row.forEach((e)=>{
        let sp = Array.from(e.querySelectorAll('span'));
        let c=0;
        sp.forEach((i)=>{
            if(i.innerHTML == val)
                c++;
        })
        if(c == 3){
            displayvictory(val,d,true);
            return true;
        }
    })
    
    for (let i = 1; i <=3; i++) {
        let colc=0;
        let col = Array.from(document.querySelectorAll(`.col${i}`));
        col.forEach((e)=>{
            if(e.innerHTML == val)
                colc++;
        })
        if(colc==3){
            displayvictory(val,d,true);
            return true;
        }
    }

    let dia = Array.from(document.querySelectorAll(".dia"));
    if((dia[0].innerHTML == val && dia[2].innerHTML == val && dia[4].innerHTML == val) || (dia[1].innerHTML == val && dia[2].innerHTML == val && dia[3].innerHTML == val)){
        displayvictory(val,d,true);
        return true;
    }
    return false;
   
}

const randomdelay = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve();
        }, 1000);
    })
}


function main(){
    let count = 0;
    let spann = document.querySelectorAll('span');

    let a = Array.from(spann);
    let div = document.querySelector(".display");
    if((count&1)==0){
        div.innerHTML="Player X chance";
    }
    a.forEach((e)=>{
        e.addEventListener('click',async ()=>{
            if((count&1)==0){
                div.innerHTML="Player O chance";
                if(e.innerHTML == ""){
                    e.innerHTML="X";
                    count++;
                }
                else{
                    div.innerHTML="Invalid"
                    await randomdelay();
                    div.innerHTML="Player X chance";
                }
                let p = checkvictory("X",div);
                if(p == true){
                    document.querySelector(".box").style.pointerEvents = "none";
                    return;
                }
            }
            else{
                div.innerHTML="Player X chance";
                if(e.innerHTML == ""){
                    e.innerHTML="O";
                    count++;
                }
                else{
                    div.innerHTML="Invalid"
                    await randomdelay();
                    div.innerHTML="Player O chance";
                }
                let p = checkvictory("O",div);
                if(p == true){
                    document.querySelector(".box").style.pointerEvents = "none";
                    return;
                }
            }
            if(count==9){
                displayvictory("",div,false);
                document.querySelector(".box").style.pointerEvents = "none";
                return;
            } 
        })
    })  
}

main();


