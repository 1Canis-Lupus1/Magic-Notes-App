import React,{Component} from 'react';
import TodoItems from './TodoItems';
import './TodoList.css';

class TodoList extends Component{
    constructor(props){
        super(props);

        this.state={
            items: []
        };

        this.addItem=this.addItem.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
        this.editItem=this.editItem.bind(this);
    }

    //Concat the new list to our state - 'item'
    addItem(event){
        if(this._inputElement.value !== ""){
            var newItem={
                text: this._inputElement.value,
                key: Date.now()
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
            items: filteredItems
        });
    }

    //Editing the notes
    editItem(key){
        let editingItem = this.state.items.filter(function(item){
            return(item.key === key);
        });

        this.setState({
            items: editingItem
        });
    }

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
                    <TodoItems entries={this.state.items} edit={this.editItem} delete={this.deleteItem} />
                </div>
            </React.Fragment>
        );
    }
}

export default TodoList;