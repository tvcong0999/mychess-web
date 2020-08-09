var flat = 0;
var currPiece;
var oldLocal;
var newLocal;
var bgColor;
var namePiece;
function run(x){
    
    if(flat == 0) // chọn quân cờ để đi
    {
        currPiece = x;
        flat = 1;
        oldLocal = getLocal(x.getAttribute("class"));
        namePiece = getName(x);
        bgColor = window.getComputedStyle(x, null).getPropertyValue("background-color");
        x.style.background = 'yellow';

    }
    else // chọn ô đê đánh quân cờ xuống
    {
        
        if(x.children.length == 0) // nếu ô đó trống
        {
            newLocal = getLocal(x.getAttribute("class"));
            
            
            if(lawOfPawn(oldLocal, newLocal, namePiece))
            {
                while(currPiece.children.length > 0)
                    x.appendChild(currPiece.children[0]);
                flat = 0;
                currPiece.style.background = bgColor;
            }
            else
            if(namePiece = "castle_b" || namePiece == "castle_w")
                if(lawOfCastle(oldLocal, newLocal))
                {
                    while(currPiece.children.length > 0)
                        x.appendChild(currPiece.children[0]);
                    flat = 0;
                    currPiece.style.background = bgColor;
                }
        }
        // else // nếu ô đó có quân cờ
        // {

        // }
    }
}
// lấy vị trí, tên quân cờ
function getLocal(str)
{
    return str.split(' ')[1];
}
//lấy tên quân cờ
function getName(x)
{
    var name = x.children[0].getAttribute("src");
    return name.slice(0,name.length-4);
}
// đường đi của quân cờ:
function lawOfPawn(currIndex, newIndex, pawn)
{
    if(pawn == "pawn_w") // tốt trắng
    {
        if(currIndex[1] == '7')
        {
            if(newIndex[1]=='6' || newIndex[1] == '5')
                if(newIndex[0] == currIndex[0])
                    return true;
        }
        else
        {
            if((newIndex[1]==currIndex[1]-'1') && (newIndex[0] == currIndex[0]))   
                return true;
        }
    }
    else
    {
        if(currIndex[1] == '2')
        {
            if(newIndex[1]=='4' || newIndex[1] == '3')
                if(newIndex[0] == currIndex[0])
                    return true;
        }
        else
        {
            if((parseInt(newIndex[1])==parseInt(currIndex[1])+1) && (newIndex[0] == currIndex[0]))   
                return true;
        }
    }
    return false;
}
// đường đi của quân xe
function lawOfCastle(currIndex, newIndex)
{
    if(currIndex[0] ===  newIndex[0])
    {
    if(currIndex[1] < newIndex[1]) // chiều dọc
    {
        for(let i = parseInt(currIndex[1]) + 1; i < parseInt(newIndex[1]); i++)
        {
            let local = currIndex[0] + i;
            let x = document.getElementsByClassName(local);
              if(x.item(0).children.length == 1)
                  return false;
        }
    }
    else
    if(currIndex[1] > newIndex[1]) // chiều dọc
    {
        for(let i = parseInt(newIndex[1]) + 1; i < parseInt(currIndex[1]); i++)
        {
            let local = newIndex[0] + i;
            let x = document.getElementsByClassName(local);
            if(x.item(0).children.length == 1)
                return false;
        }
    }
   
    }
    else // theo chiều ngang
    {   
        if(currIndex[1] ===  newIndex[1])
        {
            if(currIndex[0] < newIndex[0]) // chiều ngang
            {
                for(let i = currIndex[0].charCodeAt() + 1; i < newIndex[0].charCodeAt(); i++)
                {
                    let local = String.fromCharCode(i) + currIndex[1];
                    let x = document.getElementsByClassName(local);
                    if(x.item(0).children.length == 1)
                          return false;
                }
            }
            else
            if(currIndex[0] > newIndex[0]) // chiều ngang
            {
                for(let i = newIndex[0].charCodeAt() + 1; i < currIndex[0].charCodeAt(); i++)
                {
                    let local = String.fromCharCode(i) + currIndex[1];
                    let x = document.getElementsByClassName(local);
                    if(x.item(0).children.length == 1)
                          return false;
                }
            }
        }
        else
            return false;
    }
    return true;
}
// đường đi của quân tịnh
function lawOfBishop(currIndex, newIndex)
{
     
}
// quân tốt ăn cờ:
function pawnDefeat()
{
    
}