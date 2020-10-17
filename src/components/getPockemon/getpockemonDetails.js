import axios from 'axios';

const getpockemonDetails = (url) => {
    return new Promise((resolve, reject) => {
            axios.get(url)
            .then(rez => {
                console.log('in getpockemonDetails');
                console.log(rez);
                const details = {};
                details['Name'] = rez.data.name;
                details['images'] = rez.data.sprites;
                const abilities = {};
                    rez.data.abilities.map((ability, ind) => {
                    const newAbility = {};
                    newAbility['Abiliy name'] = ability.ability.name;
                    //ability.ability.url;
                    axios.get(ability.ability.url)
                    .then(detailedAbility => {
                        detailedAbility.data.effect_entries.map(entry => {
                            if(entry.language.name === 'en') {
                                newAbility['effect'] = entry.effect;
                                newAbility['shortEffect'] = entry.short_effect;
                            }
                        });
                    });
                    //return newAbility;
                    abilities[ind] = newAbility;
                    abilities['foreignNames'] = rez.data.abilities.names;
                });
                details['abilities'] = abilities;

                const moves = {};
                rez.data.moves.map((move, ind) => {
                    const currentMove = {};
                    for(let s in move) {
                        if(!Array.isArray(move[s])) {
                            for(let ss in move[s]) {
                                //if(ss !== 'url')
                                    currentMove[ss] = move[s][ss];
                                /*else {
                                    axios.get(move[s][ss])
                                    .then(detailedMove => {
                                        currentMove['detailedMove'] = detailedMove.data;
                                    });
                                }*/
                            }
                            // = move[s];
                        }
                    }


                    moves[ind] = currentMove;
                });
                details['moves'] = moves;


                for(let s in rez.data) {
                    if(typeof rez.data[s] !== 'object' && !Array.isArray(rez.data[s]) && rez.data[s] !== null && rez.data[s] !== undefined) {
                        if(typeof rez.data[s] === 'string') {
                            if(!rez.data[s].includes('http'))
                            details[s] = rez.data[s];
                        }
                        else details[s] = rez.data[s];
                    }
                }

                details['reminder'] = rez.data;
                //resolve(rez.data);
                resolve(details);
            })
            .catch(err => { 
                reject(err); 
                //alert(`caught in  getpockemonDetails: \n${JSON.stringify(err)}`);
            });
    });

}

export default getpockemonDetails;