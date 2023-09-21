const cardContainer = document.querySelector('.card-container')
const divContainer = document.querySelector('.container')
const gambarr = document.querySelector('.gambarr')
const cari = document.querySelector('.search')

// fetch('https://www.omdbapi.com/?i=tt3896198&apikey=ec7f56f6&s=avengers').then(data=>data.json()).
//     then((data1)=>{
//         const {Search} = data1
//         // return 10 data 
//         // buat kartu sebanyak total data menggunakan for of

//         // buat elemen kosong
//         let card = ``
//         for (kartu of Search){
//            card += `
//            <div class="w-[300px] h-[400px] bg-blue-400 rounded-md overflow-hidden">
//             <img class="w-full h-[300px]" src="${kartu.Poster}" alt="">
//             <div class="px-5 py-2">
//                 <h1>${kartu.Title}</h1>
//                 <p>${kartu.Year}</p>
//                 <button class="bg-blue-500 border border-solid border-black px-2 py-1"> Movie Detail</button>
//             </div>
//            </div>
//            `
//         }

//         // setelah buat baru lalu masukin innerHTML nya ke card container
//         cardContainer.innerHTML = card
      
//     })

 //  cara baru

 cari.addEventListener('click',()=>{
    inputU = document.getElementById('input').value
    gantiKartu(inputU)

 })


async function getData(i){
    const movieData = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=ec7f56f6&s=${i}`)
    const movieDataJSON = await movieData.json()
    return movieDataJSON
}




async function gantiKartu(ganti) {
    const data = await getData(ganti)
    const {Search} = data
    // return 10 data 
    // buat kartu sebanyak total data menggunakan for of

    // buat elemen kosong
    let card = ``
  
    for (kartu of Search){
    card += `
       <div class="w-[300px] h-content bg-blue-400 rounded-md overflow-hidden">
        <img class="w-full h-[300px]" src="${kartu.Poster}" alt=""><div class="px-5 py-2">
            <h1>${kartu.Title}</h1>
            <p>${kartu.Year}</p>
            <button class="bg-blue-500 border border-solid border-black px-2 py-1 btnDetail rounded-lg" id=${kartu.imdbID}> Movie Detail</button>
        </div>
       </div>
       `
       
    }

    // setelah buat baru lalu masukin innerHTML nya ke card container
        cardContainer.innerHTML = card
    
        cardContainer.addEventListener('click',async (e)=>{
            if(e.target.classList.contains('btnDetail')){
                //ambilDetail
                const idDetail = e.target.id
                const gambarDetail = e.target.parentElement.previousSibling.src
                console.log(gambarDetail)
              
              
                const data = await (await ambilDetail(idDetail)).json()
                const {Title,Director,Actors,Writer,Plot} = data

                let isiDetail = ` 
                <div class="container buttonDetail bg-blue-400 w-[500px] h-content fixed top-1/3 left-1/3 flex rounded-xl">
                <img class="w-[250px] h-[300px] mx-5 my-5" src="${gambarDetail}" alt="">
           
                <div class="w-screen gap-2 flex flex-col">
                <h3 class="judulDetail font-bold my-2"> Title:  ${Title}</h3>
                <p class="isiDetail">Director: ${Director}</p>
                <p class="isiDetail">Actors: ${Actors}</p>
                <p class="isiDetail">Writer: ${Writer}</p>
                <p class="isiDetail">Plot: ${Plot}</p>
                <div class="my-4 divbutton">
                <button class="font-bold w-20 bg-white divbutton rounded-lg"> Close</button>
                </div>
                </div>
               
             </div>`
               gambarr.innerHTML = isiDetail
               divContainer.classList.add('blur-sm')
               
               const divbutton = document.querySelector('.buttonDetail')
            //    const popupHilang = document.querySelector('.buttonDetail')
               divbutton.addEventListener('click',(e)=>{
                console.log(e.target)
                if(e.target.classList.contains('divbutton')){
                        divContainer.classList.remove('blur-sm')
                        e.target.parentElement.parentElement.parentElement.remove()
                     }
               })
              
            }
        })

}

async function ambilDetail(x){
    const detailData = (fetch(`https://www.omdbapi.com/?apikey=ec7f56f6&i=${x}`))
   return detailData

}







