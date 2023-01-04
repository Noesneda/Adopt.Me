import React from 'react';
import stl from "../Pagination/Pagination.module.css"


export default function Paging({mascotasPerPage, allPets, actualPage, currentPage}) {

    const pageNumbers = [];
    const maxpage = Math.ceil(allPets/mascotasPerPage)
   
    for (let i = 0; i < maxpage; i++) {
        pageNumbers.push(i + 1)
    }

    /////////////////////////////////////// LIMITO EL NUMERO DE PAGINAS A MOSTRAR /////////////////////////////////////////////////////

    let limitedPages = [];

    if (pageNumbers) {
      let showMax = 2;
      let endPage;
      let startPage;

      if (pageNumbers <= showMax) {
        startPage = 1;
        endPage = pageNumbers.length;
      } else {
        startPage = currentPage;
        if (startPage !== pageNumbers.length && (startPage + 1) !== pageNumbers.length) {
          endPage = currentPage + showMax - 1;
        } else {
          endPage = pageNumbers.length;
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        limitedPages.push(i);
      }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
    
    return (
        <nav>
            <div className={stl.pagination}>
              <button className={stl.buttonpaging} onClick={() => actualPage(pageNumbers.at(0))}>
              ⬅⬅
              </button>
            <button
                className={stl.buttonpaging}
                disabled={currentPage <= 1 ? true : false}
                onClick={() => actualPage(currentPage - 1)}
              >
                ⬅
              </button>
                {limitedPages && limitedPages.map(num => {
                    return (
                
                        <div className={stl.pagenr} key={num}>
                         
                            <button className={stl.buttonpaging} onClick={() => actualPage(num)}>{num}</button>
                            
                        </div>

                    )
                })}
                <button
                className={stl.buttonpaging}
                disabled={currentPage === pageNumbers.at(-1) ? true : false}
                onClick={() => actualPage(currentPage + 1)}
              >
                ⮕
              </button>
              <button className={stl.buttonpaging} onClick={() => actualPage(pageNumbers.at(-1))}>
              ⮕⮕</button>
            </div>  

        </nav>        
    )
}