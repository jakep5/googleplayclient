import React, { Component } from 'react'
import AppEntry from '../AppEntry/AppEntry'

export default class AppForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apps: [],
            search: '',
            sort: '',
            genre: '',
            error: null,
        }
    }

    setSearch = (search) => {
        this.setState({
            search
        })
    }

    setSort = (sort) => {
        this.setState({
            sort
        });
    }

    setGenre = (genre) => {
        this.setState({
            genre
        })
        console.log(this.state.genre)
    }

    handleSubmit(e) {
        e.preventDefault();
        const baseUrl = 'http://localhost:8000/apps';
        const params = [];
        if (this.state.search) {
            params.push(`search=${this.state.search}`);
        }
        if(this.state.sort) {
            params.push(`sort=${this.state.sort}`);
        }
        if(this.state.genre) {
            params.push(`genre=${this.state.genre}`);
        }
        const query = params.join('&');
        const url = `${baseUrl}?${query}`;

        fetch(url)
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(data => {
                this.setState({
                    apps: data,
                    error: null
                })
            })
            .catch(err => {
                this.setState({
                    error: 'Sorry, could not get apps at this time.'
                })
            })
    }

    componentDidMount() {
        const url = 'http://localhost:8000/apps';
        fetch(url)
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json();
            })
            .then(data => {
                this.setState({
                    apps: data,
                    error: null
                })
            })
            .catch(err => {
                this.setState({
                    error: 'Sorry, could not get apps at this time.'
                })
            })
    }
    render() {
        const apps = this.state.apps.map((app, i) => {
            return <AppEntry {...app} key={i} />
        })
        return (
            <main>
                <div className="appFormHolder">
                    <form id="appForm" onSubmit = {(e) => this.handleSubmit(e)}>
                        <label htmlFor="search">Search: </label>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            value={this.state.search}
                            onChange={e => this.setSearch(e.target.value)}
                        />

                        <label htmlFor="sort">Sort: </label>
                        <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
                            <option value="">None</option>
                            <option value="title">Title</option>
                            <option value="rating">Rating</option>"
                        </select>

                        <label htmlFor="genre">Genre: </label>
                        <select id="genre" name="genre" onChange={e => this.setGenre(e.target.value)}>
                            <option value="Action">Action</option>
                            <option value="Puzzle">Puzzle</option>
                            <option value="Strategy">Strategy</option>
                            <option value="Casual">Casual</option>
                            <option value="Arcade">Arcade</option>
                            <option value="Card">Card</option>
                        </select>

                        <button type="submit" htmlFor="appForm">Submit</button>
                    </form>

                    <div className="App_error">{this.state.error}</div>
                </div>
                {apps}
            </main>
        )
    }
}
