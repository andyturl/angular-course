import { Ingredient } from './../../shared/ingredient.model';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,  
  Injectable
} from '@angular/core';
import {ShoppingListService} from "app/shopping-list/shopping-list.service";

@Injectable()
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']  
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;  
  

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {

  }

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
