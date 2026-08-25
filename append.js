const fs = require('fs');
const file = 'prisma/schema.prisma';
let content = fs.readFileSync(file, 'utf8');

const newModels = `
model OnlinePaymentCategory {
  id                   Int       @id @default(autoincrement()) @map("category_id")
  categoryName         String    @map("category_name") @db.VarChar(255)
  friendlyCategoryName String?   @map("friendly_category_name") @db.VarChar(255)
  sortOrder            Int?      @default(0) @map("sort_order")
  status               String?   @default("Active") @map("status") @db.VarChar(20)
  langId               Int?      @map("lang_id")
  siteId               Int?      @map("site_id")
  addedBy              Int?      @map("added_by")
  addedOn              DateTime? @default(now()) @map("added_on")
  modifiedBy           Int?      @map("modified_by")
  modifiedOn           DateTime? @updatedAt @map("modified_on")

  conferences          OnlineConference[]

  @@map("online_payment_category")
  @@index([status])
  @@index([sortOrder])
}

model OnlineConference {
  id                   Int       @id @default(autoincrement()) @map("conference_id")
  onlinePaCategoryId   Int       @map("online_pa_category_id")
  
  conferenceTitle      String    @map("conference_title") @db.VarChar(150)
  dropDownTitle        String    @map("drop_down_title") @db.VarChar(150)
  friendlyTitle        String    @map("friendly_title") @db.VarChar(100)
  
  conferenceFee        Decimal?  @default(0.00) @map("conference_fee") @db.Decimal(12,2)
  conferenceLongDesc   String?   @map("conference_long_desc") @db.LongText
  
  conferenceDate       DateTime? @map("conference_date") @db.Date
  sort                 Int?      @default(0) @map("sort")
  status               String?   @default("Active") @map("status") @db.VarChar(20)
  
  metaTitle            String?   @map("meta_title") @db.VarChar(150)
  metaKeyword          String?   @map("meta_keyword") @db.VarChar(255)
  metaDescription      String?   @map("meta_description") @db.Text
  
  showInFront          Boolean?  @default(false) @map("show_in_front")
  conferenceImageName  String?   @map("conference_image_name") @db.VarChar(255)
  conferenceExpiryDate DateTime? @map("conference_expiry_date") @db.Date
  
  confAdminEmail       String?   @map("conf_admin_email") @db.VarChar(255)
  confMailSubject      String?   @map("conf_mail_subject") @db.VarChar(500)
  confMailBody         String?   @map("conf_mail_body") @db.LongText
  confRegLimit         Int?      @map("conf_reg_limit")

  category             OnlinePaymentCategory @relation(fields: [onlinePaCategoryId], references: [id], onDelete: Restrict, onUpdate: Cascade)

  @@map("online_conference")
  @@index([onlinePaCategoryId])
  @@index([status])
  @@index([sort])
}
`;

if (!content.includes('model OnlinePaymentCategory')) {
  fs.appendFileSync(file, newModels);
  console.log("Added models to schema.prisma");
} else {
  console.log("Models already exist in schema.prisma");
}
