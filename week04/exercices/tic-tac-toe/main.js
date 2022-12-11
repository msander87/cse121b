let turn = 0;

document.querySelector('#div1').addEventListener("touchend", getElement, false);
document.querySelector('#div2').addEventListener("touchend", getElement, false);
document.querySelector('#div3').addEventListener("touchend", getElement, false);
document.querySelector('#div4').addEventListener("touchend", getElement, false);
document.querySelector('#div5').addEventListener("touchend", getElement, false);
document.querySelector('#div6').addEventListener("touchend", getElement, false);
document.querySelector('#div7').addEventListener("touchend", getElement, false);
document.querySelector('#div8').addEventListener("touchend", getElement, false);
document.querySelector('#div9').addEventListener("touchend", getElement, false);

document.querySelector('#div1 p').addEventListener("touchend", getElementMessage, false);
document.querySelector('#div2 p').addEventListener("touchend", getElementMessage, false);
document.querySelector('#div3 p').addEventListener("touchend", getElementMessage, false);
document.querySelector('#div4 p').addEventListener("touchend", getElementMessage, false);
document.querySelector('#div5 p').addEventListener("touchend", getElementMessage, false);
document.querySelector('#div6 p').addEventListener("touchend", getElementMessage, false);
document.querySelector('#div7 p').addEventListener("touchend", getElementMessage, false);
document.querySelector('#div8 p').addEventListener("touchend", getElementMessage, false);
document.querySelector('#div9 p').addEventListener("touchend", getElementMessage, false);

function getElement(event) {
    let id = "#" + event.target.id + " p";
    let element = document.querySelector(id);
    
    if (element.textContent === "") {
        document.querySelector('.error').style.display = "none";
        if (turn === 0) {
            element.textContent = "X"
            turn = 1;
        } else {
            element.textContent = "0"
            turn = 0;
        }
        isFinished();
    }
    else{
        
        document.querySelector('.error').style.display = "block";
    }


}

function getElementMessage(event) {
    let element = event.target;
    
    if (element.textContent === "") {
    }
    else{        
        document.querySelector('.error').style.display = "block";
    }


}

document.querySelector(".reset").addEventListener("click", resetAll, false);

function resetAll(){
    document.querySelector("#div1 p").textContent = "";
    document.querySelector("#div2 p").textContent = "";
    document.querySelector("#div3 p").textContent = "";
    document.querySelector("#div4 p").textContent = "";
    document.querySelector("#div5 p").textContent = "";
    document.querySelector("#div6 p").textContent = "";
    document.querySelector("#div7 p").textContent = "";
    document.querySelector("#div8 p").textContent = "";
    document.querySelector("#div9 p").textContent = "";
    document.querySelector('.error').style.display = "none";
    document.querySelector(".win").style.display = "none";
    document.querySelector(".res").style.display = "none";

    document.querySelector('#div1 p').style.color = "black";
    document.querySelector('#div2 p').style.color = "black";
    document.querySelector('#div3 p').style.color = "black";
    document.querySelector('#div4 p').style.color = "black";
    document.querySelector('#div5 p').style.color = "black";
    document.querySelector('#div6 p').style.color = "black";
    document.querySelector('#div7 p').style.color = "black";
    document.querySelector('#div8 p').style.color = "black";
    document.querySelector('#div9 p').style.color = "black";

    turn = 0;
}


function isFinished(){
    let b1 = document.querySelector('#div1 p').textContent;
    let b2 = document.querySelector('#div2 p').textContent;
    let b3 = document.querySelector('#div3 p').textContent;
    let b4 = document.querySelector('#div4 p').textContent;
    let b5 = document.querySelector('#div5 p').textContent;
    let b6 = document.querySelector('#div6 p').textContent;
    let b7 = document.querySelector('#div7 p').textContent;
    let b8 = document.querySelector('#div8 p').textContent;
    let b9 = document.querySelector('#div9 p').textContent;

    let p1 = document.querySelector('#div1 p');
    let p2 = document.querySelector('#div2 p');
    let p3 = document.querySelector('#div3 p');
    let p4 = document.querySelector('#div4 p');
    let p5 = document.querySelector('#div5 p');
    let p6 = document.querySelector('#div6 p');
    let p7 = document.querySelector('#div7 p');
    let p8 = document.querySelector('#div8 p');
    let p9 = document.querySelector('#div9 p');

    if(b1 == b2 && b1 == b3 && b1 !=""){
        document.querySelector(".win").textContent = "'"+ b1 +"' wins!";
        document.querySelector(".win").style.display = "block";
        document.querySelector(".res").style.display = "block";
        p1.style.color = "#f08080";
        p2.style.color = "#f08080";
        p3.style.color = "#f08080";
    }
    else if(b1 == b5 && b1 == b9 && b1 !=""){
        document.querySelector(".win").textContent = "'"+ b1 +"' wins!";
        document.querySelector(".win").style.display = "block";
        document.querySelector(".res").style.display = "block";
        p1.style.color = "#f08080";
        p5.style.color = "#f08080";
        p9.style.color = "#f08080";
    }
    else if(b1 == b4 && b1 == b7 && b1 !=""){
        document.querySelector(".win").textContent = "'"+ b1 +"' wins!";
        document.querySelector(".win").style.display = "block";
        document.querySelector(".res").style.display = "block";
        p1.style.color = "#f08080";
        p4.style.color = "#f08080";
        p7.style.color = "#f08080";
    }
    else if(b2 == b5 && b2 == b8 && b2 !=""){
        document.querySelector(".win").textContent = "'"+ b2 +"' wins!";
        document.querySelector(".win").style.display = "block";
        document.querySelector(".res").style.display = "block";
        p2.style.color = "#f08080";
        p5.style.color = "#f08080";
        p8.style.color = "#f08080";
    }
    else if(b4 == b5 && b4 == b6 && b4 !=""){
        document.querySelector(".win").textContent = "'"+ b4 +"' wins!";
        document.querySelector(".win").style.display = "block";
        document.querySelector(".res").style.display = "block";
        p4.style.color = "#f08080";
        p5.style.color = "#f08080";
        p6.style.color = "#f08080";
    }
    else if(b7 == b8 && b7 == b9 && b7 !=""){
        document.querySelector(".win").textContent = "'"+ b7 +"' wins!";
        document.querySelector(".win").style.display = "block";
        document.querySelector(".res").style.display = "block";
        p7.style.color = "#f08080";
        p8.style.color = "#f08080";
        p9.style.color = "#f08080";
    }
    else if(b7 == b5 && b7 == b3 && b7 !=""){
        document.querySelector(".win").textContent = "'"+ b7 +"' wins!";
        document.querySelector(".win").style.display = "block";
        document.querySelector(".res").style.display = "block";
        p7.style.color = "#f08080";
        p5.style.color = "#f08080";
        p3.style.color = "#f08080";
    }
    else if(b3 == b6 && b3 == b9 && b3 !=""){
        document.querySelector(".win").textContent = "'"+ b3 +"' wins!";
        document.querySelector(".win").style.display = "block";
        document.querySelector(".res").style.display = "block";
        p3.style.color = "#f08080";
        p6.style.color = "#f08080";
        p9.style.color = "#f08080";
    }
    
}
