import React from 'react';
import ItemList from './../../components/Itemlist/ItemList';
import ItemStore from './../../stores/ItemStore';
import ItemActions from './../../actions/ItemActions';

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items : [],
      loading: false
    };
  }

  componentDidMount() {
    this.unsubscribe = ItemStore.listen(this.onStatusChange.bind(this));
    ItemActions.loadItems();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onStatusChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>
        <h1>Home Area</h1>
        <ItemList { ...this.state } />
      </div>
    );
  }
}

export default Home;
