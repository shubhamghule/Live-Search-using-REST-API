import React from "react";
import axios from "axios";
import "../styles/Search.css";


class Search extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            query : ' ',
            results : {},
            loading : false,
            message : '',
        };
        this.cancel = '';
    }

    /**
 * Fetch the search results and update the state with the result.
 *
 * @param {int} updatedPageNo pagination token
 * @param {String} query Search Query.
 *
 */

    fetchSearchResults = (updatedPageNo = '', query ) => {
    const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
        
    // By default the limit of results is 20
    const searchUrl = `https://api.homedrop.in/products?search=${query}&category=&limit=15&pagination_token=15`;  //${query}`; 
    
    // const searchUrl = `https://pixabay.com/api/?key=12413278-79b713c7e196c7a3defb5330e&q=${query}${pageNumber}`;

    if (this.cancel) {
		// Cancel the previous request before making a new request
		this.cancel.cancel();
    }
    
	// Create a new CancelToken
    this.cancel = axios.CancelToken.source();
    
    axios.get(searchUrl, {
			cancelToken: this.cancel.token,
		})
		.then((res) => {
            console.log("res:" ,res);
            const resultNotFoundMsg = !res.data.body.length
				? 'There are no more search results. Please try a new search.'
                : '';

                this.setState({
                    results: res.data.body,
                    message: resultNotFoundMsg,
                    loading: false,
                })
            })
                .catch((error) => {
                    if (axios.isCancel(error) || error) {
                        console.log("err : ",error);

                        this.setState({
                            loading: false,
                            message: 'Failed to fetch results.Please check network',
                        });
                    }
                });
        };
    


        handleOnInputChange = (event) => {
            const query = event.target.value;
            if ( !query ) {
                this.setState({ query, results: {}, message: '' } );
            } else {
                this.setState({ query, loading: true, message: '' }, () => {
                    this.fetchSearchResults(1, query);
                });
            }
        };

        renderSearchResults = () => {
            console.log("state : ",this.state);
            const { results } = this.state;
            console.log(results);
            if (Object.keys(results).length && results.length) {
                return (
                    <div className="results-container">
                        {results.map(result => {
                            return (
                                <a key={result.id} href={result.thumbnail} className="result-item">
                                    <h6 className="image-username">{result.name}</h6>
                                    <div className="image-wrapper">
                                        <img className="image" src={result.thumbnail} alt={`${result.name} image`}/>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                );
            }
        };


    render(){
        const { query } = this.state;
        // console.log(query);
        return(
            
            <div className="container">
                {/* Heading */}
                <h2 className="heading"> Live Search </h2>
                {/* search input */}
                <label className="search-label" htmlFor="search-input">
                    <input
                        type = "text"
                        value={ query }
                        id="search-input"
                        placeholder="search..."
                        onChange={this.handleOnInputChange}
                    />
                    <i className="fa fa-search search-icon" aria-hidden="true"></i>
                </label>
                {/*Result*/}
			{ this.renderSearchResults() }
    
            </div>
        )
    }
}
export default Search;