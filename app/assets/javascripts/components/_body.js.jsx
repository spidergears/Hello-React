var Body = React.createClass({
  getInitialState() {
    return {items: []};
  },

  componentDidMount(){
    $.getJSON('/api/v1/items.json', (response) => {this.setState( {items: response} )});
  },

  handleSubmit(item) {
    console.log("Submited item");
    var newState = this.state.items.concat(item);
    this.setState({items: newState});
  },

  handleDelete(id) {
    console.log('in handle delete body');
    $.ajax({
      url: `/api/v1/items/${id}`,
      type: 'DELETE',
      success: () => {
        this.removeItemClient(id);
      }
    })
  },

  handleUpdate(item) {
    $.ajax({
      url: `/api/v1/items/${item.id}`,
      type: 'PUT',
      data: {item: item},
      success: () => {
        this.updateItem(item);
      }
    })
  },

  removeItemClient(id){
    var newItems = this.state.items.filter((item) => {
      return item.id != id
    });

    this.setState({items: newItems});
  },

  updateItem(item) {
    var items = this.state.items.filter((it) => {return it.id != item.id});
    items.push(item);
    this.setState({items: items});
  },

  render() {
    return (
      <div>
        <NewItem handleSubmit={this.handleSubmit}/>
        <ItemList items={this.state.items} 
          handleDelete={this.handleDelete}
          onUpdate={this.handleUpdate}/>
      </div>
    );
  }
});
