import { Component, TemplateRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ProductService } from '../../services/product.service';
import { MessageService } from '../../services/message.service';
import { UserService } from 'src/app/services/user.service';

import { Product } from '../../models/product';
import { OrderItem } from '../../models/orderitem';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  modalRef: BsModalRef;

  products: Product[] = [];
  productForm: FormGroup;
  productItemForm: FormGroup;
  selectedProduct: Product;

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              private modalService: BsModalService,
              private messageService: MessageService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.productForm.controls; 
  }

  getAllProducts() {
    this.productService.getProducts()
      .subscribe(data => {
        this.products = data;
      });
  }

  /* ADD PRODUCT */
  openAddProductModal(template: TemplateRef<any>) {    
    this.productForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'description' : [null, Validators.required],
      'price' : [null, Validators.required]      
    });
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  onAddProduct() {
    if (this.productForm.invalid) {
      return;
    }
    let product = <Product>this.productForm.value;
    this.productService.createProduct(product)
      .subscribe(res => {
          this.getAllProducts();
          this.modalRef.hide();
          this.messageService.success(`Added ${product.name} product.`);
        });
  };

  /* EDIT PRODUCT */
  openEditProductModal(template: TemplateRef<any>, product: Product) {   
    this.productForm = this.formBuilder.group({
      'productId' : product.productId,
      'name' : [product.name, Validators.required],
      'description' : [product.description, Validators.required],
      'price' : [product.price, Validators.required]
    });
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  onUpdateProduct() {
    if (this.productForm.invalid) {
      return;
    }
    let product = <Product>this.productForm.value;
    this.productService.updateProduct(product.productId, product)
      .subscribe(res => {
          this.getAllProducts();
          this.modalRef.hide();
          this.messageService.success(`Updated ${product.name} product.`);
        });
  };

  /* DELETE PRODUCT */
  openDeleteProductModal(template: TemplateRef<any>, product: Product) {
    this.selectedProduct = product;
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  onDeleteProduct(product: Product) {
    this.productService.deleteProduct(product.productId)
    .subscribe(res => {
      this.getAllProducts();
      this.selectedProduct = {} as Product;
      this.modalRef.hide();
      if (res.ok) {
        this.messageService.success(res.message);
      } else {
        this.messageService.error(res.message);
      }  
    });
  }

  /* ADD ORDER ITEM */
  openCreateOrderItemModal(template: TemplateRef<any>, product: Product) {   
    this.productItemForm = this.formBuilder.group({
      'productId' : [{value: product.productId, disabled: true}],
      'name' : [{value: product.name, disabled: true}],
      'price' : [{value: product.price, disabled: true}],
      'quantity' : [null, Validators.required]
    });
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  onCreateOrderItem() {
    if (this.productItemForm.invalid) {
      return;
    }
    let productitem = <Product>this.productItemForm.getRawValue();    
    this.userService.addOrderItem(productitem)
    this.modalRef.hide();
    this.messageService.success(`OrderItem ${productitem.name} added to order.`);
  };

}
