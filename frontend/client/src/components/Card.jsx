import  React, { useEffect, useState } from 'react';


function Card() {
    const [data ,setData] = useState();

    useEffect(()=>{
        const fetchData = async()=>{
           try{
            const res = await fetch(`http://localhost:3000/`);
            const result = await res.json();

            if ( result.success === false) {
                console.error(result.error);
                return;
            }
            setData(result.message);
            // console.log(result);
           }catch(error){
            console.log(error);
           }
        }
       fetchData();
    },[]);

  return (
    <div className="card">
        {data && <p>{data}</p>}
     
    </div>
  );
}

export default Card;
