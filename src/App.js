
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import './App.css';
import Pagination from './components/Pagination';
import PostList from './components/PostList';

function App() {

  const [postList,setPostList]=useState([]);
  const[pagination,setPagination]=useState({
    _page:1,
    _limit:10,
    _totalRows:1,
  })

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });

  useEffect(()=>{
      const fetchPostList= async()=>{
        try {
          const paramsString=queryString.stringify(filters)
          const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
          const response= await fetch(requestUrl);
          const responseJon= await response.json();
          
          const{data,pagination}=responseJon;
          console.log(pagination)
          setPostList(data);
          setPagination(pagination)
          console.log(postList);
        } catch (error) {
          console.log('Failed to fetch post list:',error.message)
          
        }
      }
      fetchPostList();
  },[filters])

  const handlePageChange=(newPage)=>{
    setFilters({...filters,_page:newPage})
  }
  return (
    <div className="App">
      <h1>react hooks-PostList</h1>
      <PostList postList={postList}/>
      <Pagination pagination={pagination} onPageChange={handlePageChange}/>
    </div>
  );
}

export default App;
