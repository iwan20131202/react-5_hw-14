import { Component } from "react";
import { IoSearchOutline } from "react-icons/io5";

import { Header, Form, SearchBox, Input, Button } from "./Searchbar.styled.js";

export class Searchbar extends Component {
  state = {
    query: "",
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { query } = this.state;
    if (!query.trim()) return;

    this.props.onSubmit(query.trim());
    this.setState({ query: "" });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <SearchBox>
            <Input
              type="text"
              autocomplete="off"
              autofocus
              placeholder="Search images and photos"
              value={this.state.query}
              onChange={this.handleChange}
            />
            <Button type="submit">
              <span>
                <IoSearchOutline />
              </span>
            </Button>
          </SearchBox>
        </Form>
      </Header>
    );
  }
}