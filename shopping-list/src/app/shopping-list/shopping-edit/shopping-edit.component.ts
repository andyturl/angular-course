import { Ingredient } from 'app/shared/ingredient.model';
import { Subscription } from 'rxjs/Subscription';
import {
  Component,
  OnInit, 
  Injectable,
OnDestroy,
ViewChild
} from '@angular/core';
import {ShoppingListService} from "app/shopping-list/shopping-list.service";
import {NgForm} from "@angular/forms";

@Injectable()
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']  
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm : NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex :number;
  editedItem: Ingredient;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) =>
    {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });
  }

  ngOnDestroy(){ 
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else
    {
      this.shoppingListService.addIngredient(newIngredient);
    }
    form.reset();
    this.editMode = false;
  }

  onClear() {    
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.remove(this.editedItemIndex);
    this.editMode = false;
    this.shoppingListForm.reset();
  }
}
