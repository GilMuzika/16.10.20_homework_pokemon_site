    import axios from 'axios';




        const getPockemons = (url, stopFactor) => {
            //alert(`In Firer: \n${url}, ${stopFactor}`);
            return new Promise((resolve, reject) => {
                if(stopFactor) {
                    url += `?limit=${stopFactor}`;
                }
                axios.get(url)
                .then(res=>  {
                    resolve(res.data.results);
                })
                .catch(err => {
                    alert(`caught in  getPockemons: \n${JSON.stringify(err)}`);
                    reject(err);
                });
            });
    }

    export default getPockemons;



