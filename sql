
Database Name : Admin

// product table

create table product(
  id int not null auto_increment,
  productName varchar(20) not null,
  category varchar(50) not null,
  brand varchar(50) not null,
  uniqueid varchar(50) not null,
  sku varchar(100) not null,
  quantity int(11) not null,
  description varchar(255) not null,
  tax varchar(100) not null,
  discountType varchar(100) not null,
  price int(11) not null,
  status varchar(255) not null,
  productImage varchar(255) not null,
  barCode varchar(255) not null,
  createdat timestamp default current_timestamp,
  primary key(id)
);

//users table

create table Users(
  id int not null auto_increment,
  username varchar(20) not null,
  password varchar(50) not null,
  primary key(id)
);

// UserSession table

create table UserSession(
  id int not null auto_increment,
  loginid int(25) not null,
  token varchar(255) not null,
  status varchar(20) not null,
  createdate timestamp default current_timestamp,
  primary key(id)
);

// category table

create table category(
id int auto_increment,
  categoryName varchar(255) not null,
  categoryCode varchar(255) not null,
  description varchar(255) not null,
 createdat timestamp default current_timestamp,
  primary key(id)
);

// brand table

create table brand(
id int auto_increment,
  brandName varchar(255) not null,
  brandDescription varchar(255) not null,
  brandImage varchar(255) not null,
  createdat timestamp default current_timestamp,
  primary key(id)
);

// manufacturer table

create table manufacturer(
  id int not null auto_increment,
  companyName varchar(50) not null,
  location varchar(50) not null,
  phone int(11) not null,
  email varchar(30) not null,
  website varchar(50) not null,
  establishment varchar(100) not null,
  brandName varchar(100) not null,
  createDate timestamp default current_timestamp,
  primary key(id)
);


// Vendor

create table Vendor(
  id int not null auto_increment,
  companyName varchar(50) not null,
  vendorAddress varchar(150) not null,
  vendorEmail varchar(30) not null,
  vendorContactNumber int(15) not null,
  website varchar(50) not null,
  GSTIN varchar(100) not null,
  contactPersonName varchar(100) not null,
  emailAddress varchar(50) not null,
  workContactNumber int(15) not null,
  personalContactNumber int(15) not null,
  designation varchar(100) not null,
  createDate timestamp default current_timestamp,
  primary key(id)
);

// purchase

create table Purchase(
  id int not null auto_increment,
  companyName varchar(50) not null,
  purchaseOrderNumber int(15) not null,
  address varchar(150) not null,
  paymentMode varchar(100) not null,
  paymentStatus varchar(100) not null,
  products varchar(50) not null,
  type varchar(150) not null,
  totalTax varchar(100) not null,
  totalDiscount varchar(100) null,
  grandTotal BIGINT NOT null,
  postedBy varchar(100) not null,
  createDate timestamp default current_timestamp,
  primary key(id)
);

// purchase Order (PO)


create table Purchase_Order(
  id int not null auto_increment,
  po varchar(50) not null,
  purchaseOrderNumber int(15) not null,
  productId varchar(150) not null,
  quantity int(16) not null,
  mrp int(16) not null,
  unit varchar(150) not null,
  price int(15) not null,
  discount int(15) not null,
  tax int(15) null,
  total BIGINT NOT null,
  createDate timestamp default current_timestamp,
  primary key(id)
);


// customer

create table Customer(
id int auto_increment,
  name varchar(255) not null,
  email varchar(255) not null,
  phone int(15) not null,
  type varchar(100) null,
  GSTno varchar(50) null,
  postedBy varchar(100) not null,
  createdat timestamp default current_timestamp,
  primary key(id)
);

// sales table

create table Sales(
id int auto_increment,
  customerName int(15) not null,
  saleDate varchar(255) not null,
  supplier int(15) not null,
  paymentStatus varchar(100) null,
  unit varchar(50) null,
  totalTax varchar(100) null,
  subTotal varchar(100) null,
  totalDiscount varchar(100) null,
  grandTotal varchar(100) null,
  postedBy varchar(100) not null,
  date date,
  createdat timestamp default current_timestamp,
  primary key(id)
);

create table Sales_order(
  id int not null auto_increment,
  so int(15) not null,
  product varchar(150) not null,
  quantity int(16) not null,
  mrp int(16) not null,
  unit varchar(150) not null,
  price int(15) not null,
  discount int(15) not null,
  tax int(15) null,
  total BIGINT NOT null,
  createDate timestamp default current_timestamp,
  primary key(id)
);



