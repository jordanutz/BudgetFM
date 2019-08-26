import React from 'react'

const Pagination = ({paginate, currentPage}) => {

  return (
    <nav>
      <button disabled={currentPag} onClick={() => paginate(currentPage)} className="page-link">Forward</button>   
    </nav>
  )
}

export default Pagination