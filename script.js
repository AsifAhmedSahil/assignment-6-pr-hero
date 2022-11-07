const loadData = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);

  const data = await res.json();
  displayCategory(data.data.news_category);
};

const displayCategory = (categories) => {
  console.log(categories);
  const categoryContainer = document.getElementById("category-container");
  // const newsContainer = document.getElementById("news-container")

  categories.forEach((news) => {
    // console.log(news.category_id)

    const newsDiv = document.createElement("div");
    newsDiv.classList.add("flex");
    newsDiv.classList.add("p-4");
    newsDiv.classList.add("mt-3");
    newsDiv.classList.add("mx-auto");
    
    newsDiv.classList.add("text-gray-600");
    newsDiv.innerHTML = `
            <p id="${news.category_id}" onclick="getNewsID(${news.category_id})">${news.category_name}</p>
        `;
    categoryContainer.appendChild(newsDiv);
  });
};

const getNewsID = async (id)=>{
    // console.log( id)
    toggleSpinner(true)
    const a = "0"+ id;
    
    // console.log(parseInt(a))
    const url = `https://openapi.programming-hero.com/api/news/category/${a}`;
    const res = await fetch(url);

    const data = await res.json();
    
    displayAllData(data.data);
    
    }

    


const initialDataLoad = async () =>{
   try {
    const url = `https://openapi.programming-hero.com/api/news/category/01`;
    const res = await fetch(url);

    const data = await res.json();
    displayAllData(data.data);
   } catch (error) {
    console.log(error)
   }
}
const displayAllData = allNews =>{
    
    let newsNumber =  allNews.length
    
    const newsCount = document.getElementById("news-count");
    newsCount.innerText = `--------------------------------------------------> ${newsNumber ? newsNumber : "No" } news found <-------------------------------------------------- `;
    const allNewsContainer = document.getElementById("all-news-container")
    allNewsContainer.innerHTML = ""
    

    allNews.forEach((all)=>{
        // console.log(all)
        const newsAllDiv = document.createElement("div")
        
       
        newsAllDiv.innerHTML = `
        <div class="mt-10 ">
        <div class="rounded-lg drop-shadow-2xl bg-gray-100 flex   ">
          <a href="#!" class="w-1/4  ">
            <img class="w- h-[400px] p-4 rounded-t-lg" src=${all.image_url} alt=""/>
          </a>
          <div class="p-6 w-3/4 ">
            <h5 class="text-gray-900 text-3xl font-medium mb-2">${all.title}</h5>
            <p class="text-gray-700 text-xl text-base mb-[80px] h-[200px] text-ellipsis overflow-hidden ...">
              ${all.details}
            </p>
            <div class="flex justify-between items-center px-4">
                <div class="p-4 mx-4  h-full text-xl  flex items-center  ">
                <img class="w-[50px]  mx-4 rounded-full" src="${all.author.img}"/>
                ${all.author.name ? all.author.name : "No author Found" }
                </div>

                <div class="text-xl text-red-500">Total View: ${all.total_view ? all.total_view : 0}k</div>

            <button  type="button" class="showmodal inline-block px-4 py-2 bg-blue-600 text-white font-medium text-lg leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"  >Button</button>

            
            </div>
          </div>
        </div>
      </div>
        `;
        allNewsContainer.appendChild(newsAllDiv)

       
        
    })
    
    toggleSpinner(false);
}

const toggleSpinner = isLoading =>{
  const loaderSpinner = document.getElementById("loader");
  if(isLoading){
    loaderSpinner.classList.remove("hidden")
  }
  else{
    loaderSpinner.classList.add("hidden")
  }
}


loadData();
// initialDataLoad()

