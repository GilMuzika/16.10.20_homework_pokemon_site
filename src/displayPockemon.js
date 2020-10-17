import React from 'react';
import 'materialize-css';
const ret_val = {};

function disassemble(obj) {

    for(let s in obj) {
        if(typeof obj[s] !== 'object') {
            ret_val[s] = obj[s];
        }
        else{
            disassemble(obj[s]);
        }
    }
    return ret_val;
}

const displayPockemon = (obj, returnOnlyName) => {
    //console.log('in displayPockemon - disassemble');
    //console.log(disassemble(obj));
    const flatPockemon = disassemble(obj);
    let ret_val = [];
    if(!returnOnlyName) {
        
        let count = 0;
            for(let s in flatPockemon) {

                let textOrImage = flatPockemon[s];
                if(typeof flatPockemon[s] === 'string'  &&  flatPockemon[s].includes('.png')){
                    textOrImage = <img src={flatPockemon[s]}/>
                }
                let nameStyle = {};
                if(s === 'Name')
                        nameStyle = {fontSize: 30, fontWeight: 'bolder', textDecoration: 'underline'};
                    const toPush = <div>
                        <table className="table">
                            <tr>
                                <td id="right"> {s}: </td>
                                <td id="left" style={nameStyle}>{textOrImage}</td>
                            </tr>
                        </table>
                        </div>

                ret_val.push(
                toPush  
                );
                count++;
            }
        }
        else {
            ret_val ='';
            for(let s in flatPockemon) {
                if(s === 'Name')
                    ret_val = flatPockemon[s];
            }
        }
        //console.log(flatPockemon);
        if(returnOnlyName) {
            return ret_val;
        }
        else {
            return (
                <div className="container">
                    {ret_val}
                </div>
            )
        }
     
        
    
}

export default displayPockemon;