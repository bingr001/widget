import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling.css'

const Search = () => {
  const [term, setTerm] = useState('art');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term,
        },
      });

      setResults(data.query.search);
    };

    if (term && !results.length){
      search();
    } else {
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 500);
  
      return () => {
        clearTimeout(timeoutId);
      };  
    }

  }, [term]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        
        <div className="content">
          <div className="title">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
        <div className="right-floated-content">
          <a
            className="btn-float-right"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
      </div>
    );
  });

  return (
    <div className= "container">
      <div >
        <div className="form-row">
          <h1>Enter Search Term</h1>
        </div>
        <div className= "form-row ">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="ui-icon-input"
            />
            <i class="fas fa-search"></i>
          </div>
      </div>
      <ul className="celled-list">{renderedResults}</ul>
    </div>
  );
};

export default Search;
