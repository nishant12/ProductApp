import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

describe('ProductService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    productService = TestBed.inject(ProductService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('#get Products', () => {
    let expectedProducts: Array<Object>;

    beforeEach(() => {
      productService = TestBed.inject(ProductService);
      expectedProducts = [
        {
          "name": "Angular 101",
          "description": "Introduction to Angular 101",
          "available": true,
          "id": 1,
          "price": 50
        },
        {
          "id": 2,
          "name": "Angular 201",
          "description": "Client and Server Communication Angular 201",
          "price": 200,
          "available": true
        }
      ];
    });

    it('should return expected products (called once)', () => {
      productService.getAll().subscribe(
        products => expect(products).toEqual(expectedProducts, 'should return expected products')
      );

      const req = httpTestingController.expectOne(productService.baseURL);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedProducts);
    });

    it('should be OK returning no products', () => {
      productService.getAll().subscribe(
        products => expect(products.length).toEqual(0, 'should have empty products array')
      );

      const req = httpTestingController.expectOne(productService.baseURL);
      req.flush([]); // Respond with no products
    });
  });

  describe('#get Product by id', () => {
    // Expecting the query form of URL so should not 404 when id not found

    it('should get a single product and return it', () => {

      const products = [{
        "name": "Angular 101",
        "description": "Introduction to Angular 101",
        "available": true,
        "id": 1,
        "price": 50
      },
      {
        "id": 2,
        "name": "Angular 201",
        "description": "Client and Server Communication Angular 201",
        "price": 200,
        "available": true
      }];
      const makeUrl = `${productService.baseURL}/1`;

      productService.get(1).subscribe(
        data => expect(data).toEqual(products[0], 'should return the product')
      );

      // productService should have made one request to PUT products
      const req = httpTestingController.expectOne(makeUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(products[0]);
    });
  });

  describe('#update Product', () => {
    // Expecting the query form of URL so should not 404 when id not found

    it('should update a product and return it', () => {

      const updateProduct = {
        "name": "Angular 101",
        "description": "Introduction to Angular 101",
        "available": true,
        "id": 1,
        "price": 50
      };
      const makeUrl = `${productService.baseURL}/${updateProduct.id}`;

      productService.update(updateProduct.id, updateProduct).subscribe(
        data => expect(data).toEqual(updateProduct, 'should return the product')
      );

      // productService should have made one request to PUT products
      const req = httpTestingController.expectOne(makeUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateProduct);

      // Expect server to return the products after PUT
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updateProduct });
      req.event(expectedResponse);
    });
  });

  describe('#create Product', () => {

    it('should create a product', () => {

      const createProduct = {
        "name": "Vue JS",
        "description": "Introduction to Vue JS",
        "available": true,
        "price": 50
      };

      productService.create(createProduct).subscribe(
        data => expect(data).toEqual(createProduct, 'should return the product')
      );

      // productService should have made one request to POST product
      const req = httpTestingController.expectOne(productService.baseURL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(createProduct);

      // Expect server to return the product after POST
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: createProduct });
      req.event(expectedResponse);
    });
  });

  describe('#delete Product', () => {

    it('should delete the product and return empty obj', () => {

      const makeUrl = `${productService.baseURL}/1`;

      productService.delete(1).subscribe(
        data => expect(data).toEqual({}, 'should return the empty object')
      );

      // productService should have made one request to PUT products
      const req = httpTestingController.expectOne(makeUrl);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });
  });

  describe('#search Product', () => {
    // Expecting the query form of URL so should not 404 when id not found

    it('should get a product by search and return it', () => {

      const products = [{
        "name": "Angular 101",
        "description": "Introduction to Angular 101",
        "available": true,
        "id": 1,
        "price": 50
      },
      {
        "id": 2,
        "name": "Angular 201",
        "description": "Client and Server Communication Angular 201",
        "price": 200,
        "available": true
      }];
      const makeUrl = `${productService.baseURL}?q=101`;

      productService.searchByName('101').subscribe(
        data => expect(data).toEqual(products[0], 'should return the product')
      );

      // productService should have made one request to PUT products
      const req = httpTestingController.expectOne(makeUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(products[0]);
    });
  });
});
