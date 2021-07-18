let dummy
function textBox(){
    let file=searchFile.files[0]
    let reader=new FileReader()
    reader.readAsText(file)
    reader.onload=()=>{
        text.innerHTML=reader.result
        let input=reader.result
        let input1=input.replace(" ","+")
        let invalids;
        const apiKey="UGpUzODZpbQDqcUa&text="

        //fetch api key
        let api=`https://api.textgears.com/grammar?key=${apiKey}&text=${input1}&language=en-GB`
        $.ajax({
            url:api,
            method:"GET",
            success:function(result,status){
                console.log(result)
                if (status){
                    invalids=result.response.errors;
                    for (let invalid of invalids){
                        input=input.replace(
                            invalid.bad,
                            `<span  class="mistake">${invalid.bad}</span>`
                        );
                    }
                    text.innerHTML=input

                }
                // mistake defined 
                let mistakeSpan=document.querySelectorAll(".mistake");
                for (let i=0;i<mistakeSpan.length;i++){
                    $(mistakeSpan[i]).contextmenu((event)=>{
                        
                        
                        event.preventDefault();
                        $("#custom > ul").empty()
                        for (let j=0;j<invalids[i].better.length;j++){
                            $("#custom > ul").append(`<li wordtoreplace="${invalids[i].bad}" class="reference">${invalids[i].better[j]}</li>`)
                            
                        }
                      
                        $(".reference").click(
                            (event)=>{
                                let wrongWord=document.getElementsByClassName("mistake");
                                
                             
                                

                               for (let z=0;z<wrongWord.length;z++){
                              
                                    if (wrongWord[z].innerHTML==$(event.target).attr("wordtoreplace")){
                                        wrongWord[z].innerHTML=event.target.innerHTML;
                                        wrongWord[z].classList.remove("mistake");
                                        $("#custom").css("display","none");
                                        break;
                                    
                                    }
                               }

                            }
                        )
                        $("#custom").css("display","block")

                       
                      

                    })
                }
            }

        })
    }
}
