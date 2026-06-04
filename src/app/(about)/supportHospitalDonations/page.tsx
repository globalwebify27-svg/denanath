import { prisma } from "@/lib/prisma";
import SupportDonationsClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function SupportDonationsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_support_donations' } });

  let donationsData: any = {};
  try { 
    if (setting) {
      donationsData = JSON.parse(setting.value);
    } else {
      // Fallback data
      donationsData = {
        institutionalDonors: [
          "Accolade Electronics Pvt.Ltd.", "Aquarius Engineers Private Limited", "Avaya India Private Limited", 
          "Bajaj Finance Limited", "Blue Cross Laboratories Pvt. Ltd.", "BOBST India Private Limited", 
          "CA Mujumdar & Dixit", "Calsoft Private Limited", "Corbelo Projects Pvt.Ltd.", 
          "Datsons Electronics Pvt.Ltd.", "Ecoclean Machines Pvt.Ltd.", "Fluid Controls Private Limited", 
          "Garware Fulflex Social Foundation", "General Industrial Controls Private Limited", "Globant India Private Limited"
        ],
        donationInKind: [
          "CybageAsha Trust", "Mahale Dr.Nilesh", "Potdar Anant Padmakar", 
          "Roche Products India P L", "Rotary Club of Poona Charity Trust (Camp)"
        ],
        individualDonors50to1Cr: [
          "Beharay Ashok Shrikrishna", "Chaudhari Pramod Madhukar", "Firodia Arun Hastimal", 
          "Karmarkar Sunanda Vasudeo", "Vakil Vasantika Girish"
        ],
        individualDonors25to50: [
          "Tole Prabhakar Yashwant", "Vaidya Sarita Aniruddha"
        ],
        individualDonors1to25: [
          "Bang Sapna Ajit", "Bapat Mandar Shripad", "Beharay Anuja Raghunandan", "Beharay Aruna Ashok",
          "Beharay Raghunandan Ashok", "Beharay Raghunandan Ashok (HUF)", "Bhide Dr.Vijayshree Milind", 
          "Bhurke Dr. Bhagyashree", "Chandrashekhar Venkataraman", "Dalvi Dr.Pradip Balasaheb", 
          "Dani Pradeep Shankar", "Gujarathi Nandkumar Balkrishna", "Gujrathi Hemant Balkrishna", 
          "Hasabnis Lt.Gen.Sudarshan", "Joglekar Vinayak Manik", "Kopargaonkar Dr Swati", 
          "Kulkarni Abhiijt Madhukar", "Kulkarni Aparna Vijaykumar", "Kulkarni Ulhas Narayanrao", 
          "Lagu Lalita Kamalakar", "Lakhapati Sanjay Vasant", "Maloo Manjusha", "Malshe Madhura Vinit", 
          "Mirchandani Daljit Lilaram", "Mistry Kirti Ashok", "Pai Vinayak Ratnakar", "Pansare Mandakini Sudhakar", 
          "Parasnis Dr.Amit Surendra", "Patwardhan Sadashiv Gajanan", "Pendse Surekha Jayasinha", 
          "Phadke Radhika Vinayak", "Phadke Sunita Pandurang", "Phadke Vinayak Pandurang", 
          "Prabhudesai Manjiri Shriram", "Prabhudesai Shriram Gopal", "Pradhan Shekharchandra Dattatraya", 
          "Purandare Maya Dattatraya", "Puranik Smita Nitin", "Puranik Sunil Anant", "Rane Sandeep Manohar", 
          "Rawat Pramod Trimbak", "Rawat Savita Pramod", "Sawant Vivek Vijay", "Sewak Gayatree Anant", 
          "Sewak Yogesh Anant", "Shrivastava Sonal Mitra", "Tilloo Sudheer Bhaskar", "Vaidya Aniruddha Sudhir", 
          "Vellore Jayaraman Rangashaye", "Wakankar Dr. Hemant Madhukar"
        ],
        individualDonorsUpto1: [
          "Abhyankar Dattatraya Ramchandra", "Agarkhedkar Dr. Nikhil Shrikant", "Agashe Shripad Kamlakant", "Agrawal Poonam", 
          "Argade Mugdha", "Badve Dnyaneshwar Anant", "Bakare Neena Mangesh", "Bakshi Shweta", "Bang Ajit Jivanram", 
          "Bapat Ananya Aditya", "Bapaye Dr.Amol Mahadeo", "Barve Avinash", "Baxi Gira Tushar", "Baxi Tushar Mahendrarai", 
          "Bhadbhade Nita Milind", "Bhagwat Anita Baban", "Bhargav Prashant Pankaj", "Bhargava Pradeep", 
          "Bhargave Sanjay Ramchandra", "Bhat Dr.Madhav Jayant", "Bhave Dr. Asmita Arvind", "Bhave Dr.Arvind Dattatraya", 
          "Bhave Dr.Arvind Vishnu", "Bhave Gayatri Atul", "Bhave Manjiri Arvind", "Bhondwe Rashmi Amit", "Bhope Sujata Amit", 
          "Chaitanya Tejashree Tushar", "Chhatre Meghana V", "Chugh Karun Kumar", "Dabak Sadhana Abhay", "Dabir Manisha Mahesh", 
          "Damle Ameya Nandkishor", "Damle Sukhada Ashok", "Dandekar Vijay Jayram", "Desai Swaroopa", "Deshmukh Dr. Chetan Dilip", 
          "Deshmukh Dr. Vaishali Chetan", "Deshpande Deepti Susheel", "Deshpande Sheetal Praful", "Deshpande Suresh Purushottam", 
          "Deshpande Vaidehi Ramchandra", "Deshpande Vidyullata Balkrishna", "Dhakul Chitra Chintaman", "Dhand Amit", 
          "Dharmadhikari Mayur Mukund", "Dhaygude Amruta Rajendra", "Dixit Anjali Yogesh", "Dixit Nikhil Padmakar", 
          "Doshi Dr.Prajakta Haridas", "Dudhbhate Dr.Anagha Jaideep", "Dudhbhate Dr.Jaideep Anant", "Gadage Dr.Vijaya Siddharth", 
          "Gadhikar Dr.Harshal Prabhakar", "Gadkari Aaratee Ashok", "Gaidu Dr.Jyoti Amarjitsingh", "Gaurav Suhas Bhalerao", 
          "Ghag Ganesh Dilip", "Gharpure Ajey Arvind", "Ghodke Ashwini Nivrutti", "Godbole Dr.Ravibhushan Ramesh", 
          "Gogate Nirmal Shriram", "Gurjar Trupti Omkar", "Hanamannavar Seetal", "Hande Dr.Varsha Rajesh", "Hingmire Sheetal Sachin", 
          "Hulyalkar Bhagyashree Aditya", "Jadhav Bhushan Dyanoba", "Jadhav Rashmi Amit", "Jagtap Shital Sagar", "Jagtap Vishwas Annasaheb", 
          "Jain Nandini", "Jhurani Hemant Kannayalal", "Joglekar Ishan Vinayak", "Joglekar Smita Sanjay", "Joshi Amruta Vitthal", 
          "Joshi Hemlata Gajanan", "Joshi Nisha Nitin", "Joshi Sachin Subhash", "Joshi Shrinivas Madhav", "Joshi Sushama Mangesh", 
          "Joshi Vaibhav Chandrashekhar", "Joshi Vishal Vishwambhar", "Joshi Yatin Balkrishna", "Juvekar Dr.Nilesh Manohar", 
          "Kale Ketan Avinash", "Kale Mayuri Mihir", "Kanike Divyashree", "Kanitkar Vaibhav", "Kanswa Prateek", "Karmarkar Kedar Kashinath", 
          "Kedari Rameshwari", "Ketkar Anisha Hemant", "Khaladkar Dr.Bhagyashree", "Khare Dr. Prasanna Waman", "Khare Dr. Sangita Shriram", 
          "Kirkole Pradip Balkrishna", "Kolte Ujwala Pritam", "Kotwal Dr.Meera Pravin", "Ksheersagar Bhakti Sameer", 
          "Kulkarni Deepak Jagannath", "Kulkarni Kalyani Aditya", "Kulkarni Ketaki Ketan", "Kulkarni Neeta", "Kulkarni Vikas Bhalchandra", 
          "Kurlekar Dr.Utkrant", "Lele Aniruddha", "Malwade Sameer Vilas", "Manchanda Ruchika", "Mane Dr.Nilima", "Maranure Rajendra Kondiba", 
          "Mate Pooja Prashant", "Medhi Sayali Sandeep", "Mehmi Vikramjit", "Moharir Ashwini Amol", "Nagle Vikalp", "Nakhate Manjiri Sameer", 
          "Navathe Dr.Pushan Dattatreya", "Navrat Tara Rakesh", "Nerlekar Dr.(Mrs.) Mrinal Ashish", "Palande Tanuja Shripad", 
          "Palnitkar Dr. Sachin Sudhakarrao", "Pande Dr. Avinash A.", "Panse Dr.Archana Manish", "Panshikar Madhuri Atul", 
          "Parande Supriya Abhijit", "Paranjape Atul Ashok", "Paranjape Minal", "Paranjape Prafulla Ashok", "Parchure Dr.Bhakti Narendra", 
          "Patil Ajit Govind", "Pawar Shrikant S.", "Pendse Yogesh Prakash", "Pethkar Shriyavallabh Vidyadhar", "Phadke Anagha Abhinav", 
          "Phadke Sureshkumar Vasant", "Pimprikar Saurabh Ashok", "Pitkar Shilpa Sateesh", "Punekar Swati Suresh", "Puranik Swati Ravindra", 
          "Rairikar Sneha Devidas", "Rasane Mrunal Sandeep", "Rasane Pradnya Ashwinkumar", "Rasane Sandeep Suresh", "Sanas Kishor Shivaji", 
          "Sathe Dr. Shireesh Prabhakar", "Sathe Sanjay Shantanu", "Sathe Swati Sanjay", "Sathe Trupti Ganesh", "Sawai Suvarna Amit", 
          "Saxena Ankur", "Sharma Neelamkumar", "Sheeja George", "Sheeja Izak Shrisundar", "Shende Abhijeet", "Shinde Reshma Mangesh", 
          "Shirdhonkar Yashada Vijay", "Shirke Deepti", "Singh Manjiree", "Sure Dhanashri Mahesh", "Tambe Riya Abhijit", 
          "Tamboli Ramkrishna Sitaram", "Tialk Makarand Prabhakar", "Tol Abhaya", "Tol Arundhati Dattatray", "Ugine Karadi", 
          "Utpat Kiran Dnyaneshwar", "Uttarwar Dr.Akshay Jayant", "Vaidya Madhura Shailesh", "Valvekar Madan Anant", 
          "Valvekar Medha Madan", "Waikar Sachin Yashwant", "Wikhe Kishor Keshaorao", "Zambre Dr.Smita Mohan", "Zope Neena Prafulla"
        ]
      };
    }
  } catch (e) {}

  return <SupportDonationsClientPage donationsData={donationsData} />;
}
