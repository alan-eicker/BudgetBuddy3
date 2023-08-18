import React from 'react';
import { Button } from '@mui/material';

interface ListProps {
  title: string;
}

interface ListState {
  items: string[];
}

export default class List extends React.Component<ListProps, ListState> {
  state: ListState = {
    items: [],
  };

  componentDidMount(): void {
    this.setState({
      items: ['1', '2', '3'],
    });
  }

  componentWillUnmount(): void {
    console.log('List: Unmounted!');
  }

  shouldComponentUpdate(nextProps: ListProps, nextState: ListState) {
    console.log('shouldComponentUpdate', nextProps.title !== this.props.title);
    return (
      nextProps.title !== this.props.title ||
      nextState.items !== this.state.items
    );
  }

  componentDidUpdate(
    prevProps: Readonly<ListProps>,
    prevState: Readonly<ListState>,
    snapshot?: any,
  ): void {
    console.log('COMPONENT UPDATED!');
  }

  // addItem() {
  //   const currentItems = this.state.items;
  //   this.setState({
  //     items: [...currentItems, (currentItems.length + 1).toString()],
  //   });
  // }

  addItem = () => {
    const currentItems = this.state.items;
    this.setState({
      items: [...currentItems, (currentItems.length + 1).toString()],
    });
  };

  render() {
    return (
      <div style={{ padding: 30 }}>
        <h2>{this.props.title}</h2>
        {/* <Button onClick={this.addItem.bind(this)}>Add Item</Button> */}
        <Button
          sx={{ margin: '16px 0' }}
          color="primary"
          variant="contained"
          onClick={this.addItem}
        >
          Add Item
        </Button>
        <div>
          <ul>
            {this.state.items.map((item) => (
              <li
                style={{ display: 'inline-block', marginRight: 8 }}
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
