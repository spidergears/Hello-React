var NewItem = React.createClass({
  handleClick() {
    var itemName = this.refs.name.value;
    var itemDescription = this.refs.description.value;
    $.ajax({
      url: '/api/v1/items',
      type: 'POST',
      data: {item: { name: itemName, description: itemDescription}},
      success: (item) => {
        this.props.handleSubmit(item);
      },
      error: (error) => {
        console.log("item Failed", response);
      }
    });
    console.log("Item with name: " + itemName + " and description: " + itemDescription);
  },

  render() {
    return(
      <div>
        <input ref="name" placeholder="Item Name" />
        <input ref="description" placeholder="Item Description" />
        <button onClick={this.handleClick}>Submit</button>
      </div>
    );
  }
});
