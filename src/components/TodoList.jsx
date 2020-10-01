import React,{Component} from 'react';
import TodoItems from './TodoItems';
import './TodoList.css';

class TodoList extends Component{
    constructor(props){
        super(props);

        this.state={
            items: [],
            status: "All"
        };

        this.addItem=this.addItem.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
        this.editItem=this.editItem.bind(this);
        this.checkItem=this.checkItem.bind(this);
    }

    //Concat the new list to our state - 'item'
    addItem(event){
        // this._inputElement.value.trim();
        if(this._inputElement.value.trim() !== ""){
            var newItem={
                text: this._inputElement.value,
                key: Date.now(),
                checked: false
            };

            this.setState((prevState)=>{
                return {
                    items: prevState.items.concat(newItem)
                };
            });
            this._inputElement.value="";
        }

        console.log(this.state.items);

        event.preventDefault();
    }

    //Filtering the key that we want to delete
    deleteItem(key){
        let filteredItems =this.state.items.filter(function(item){
            return(item.key !== key);
        });

        this.setState({
            items: filteredItems,
        });
    }

    //Editing the notes
    editItem(key){
        let editingItem = this.state.items.filter(function(item){
            return(item.key === key);
        });

        this._inputElement.value=editingItem[0].text;

        let filteredItems =this.state.items.filter(function(item){
            return(item.key !== key);
        });

        this.setState({
            items: filteredItems
        });
    }

    checkItem(key){
        let checkedItem= this.state.items.filter(function(item){
            return(item.key === key);
        });

        checkedItem.checked= !checkedItem

        console.log("Checked item is: ", checkedItem);
    }

    handleSelect(event){
     this.setState({
         status: event.target.value
     })   
    }

    // handleAll(){
    //     console.log('Handling All');
    // }

    // handleActive(){
    //     console.log("Handle Active");
    // }

    // // handleCompleted(){
    //     console.log("Handling Completed");
    // }

    render(){
        return(
            <React.Fragment>
                <div className="todoListMain">
                    <div className="header">
                        <h2>Magic-Notes App</h2>
                        <form onSubmit={this.addItem}>
                            <input ref={ (a)=> this._inputElement = a } placeholder="Enter Task" required/>
                            <button type="submit">Add Note</button>
                        </form>
                    </div>
                    <TodoItems entries={this.state.items} edit={this.editItem} delete={this.deleteItem} check={this.checkItem} status={this.state.status}/>
                    <hr/>
                    <div className="stats">
                        <button onClick={this.handleSelect} className='btn-stats select' id="rd-1" >Select All</button>&nbsp;
                        <button onClick={this.handleSelect} value="All" className='btn-stats all'>All</button>&nbsp;
                        <button onClick={this.handleSelect} value="Active" className='btn-stats active'>Active</button>&nbsp;
                        <button onClick={this.handleSelect} value="Completed" className='btn-stats completed'>Completed</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TodoList;