import React from "react";
import {Pagination as PaginationSU} from "semantic-ui-react";
import {useRouter} from "next/router";
import queryString from "query-string";


export default function Pagination(props) {
    const {totalGames,page,limitPerPage}=props;
    const totalPages= Math.ceil(totalGames/limitPerPage);
    const router= useRouter();
    const urlParse= queryString.parseUrl(router.asPath);

    const goToPage =(newPage)=>{
     urlParse.query.page=newPage;
     const url = queryString.stringifyUrl(urlParse);
     router.push(url);
    };

    return (
        <div className="pagination">
        <PaginationSU 
        defaultActivePage={page}
         totalpages={totalPages}
         firstItem={null}
         lastItem={null}
         onPageChange={(_,data)=>goToPage(data.activePage)}
         boundaryRange={0}
         siblingRange={1}
         elipsisItem={null}

        />
        </div>
    );
}
