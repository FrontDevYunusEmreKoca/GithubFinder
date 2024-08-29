import React, { useState } from 'react'

const Search = ({searchUsers}) => {
    const [keyword,setKeyword] = useState("")

    const onChange =(e) =>{
         setKeyword(e.target.value)
         
    }
    const onSubmit =(e)=>{
        e.preventDefault(); // Sayfanın yeniden yüklenmesini önlemek için
        searchUsers(keyword);
    }

  return (
    <form  onSubmit={onSubmit}>
        <div className='container my-3'>
            <div className="input-group mb-3">
                <input onChange={onChange} type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" id='inputValue'/>
                <button className='btn btn-primary btn-sm '>Search</button>
              
            </div>
    </div>
</form>
    
  )
}

export default Search
