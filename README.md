# Application Features

### Features Admin Side (CMS)

1. **Login**

   - Admins can log in securely to access the CMS.

2. **Logout**

   - Admins can log out securely to end their CMS session.

3. **Manage Subscription**

   - View the entire list of subscriptions users.
   - Deactivate user subscriptions as needed.

4. **Manage Post**

   - View the entire list of posts.
   - View post details, create, edit, and delete posts.

5. **Manage Transactions Invoice**

   - View all user transactions against subscriptions.
   - Update transaction status from "process" to "completed" or "canceled."
   - Filter transactions by date and status.

6. **Perform Authorization**
   - Ensure that data can only be managed by users with the admin role.

### User Portal Features

Using the Next.js tech stack, the User Portal offers the following features:

1. **Login**

   - Users can access a separate page to log in.

2. **Logout**

   - Users can log out securely.

3. **Register**

   - Users can register by providing minimum input fields:
     - Name
     - Email
     - Password
     - Password confirmation
     - Address
     - Phone number
     - Referral

4. **Home Search All Posts**

   - Main menu for logged-in users.
   - Displays premium post tags.
   - Shows 5 trending posts defined by newest and most liked.
   - Features a section with filtered posts by title, category, and payment status.
   - Sorting options based on post date (ascending/descending).
   - Default display sorted by the latest post creation date.
   - Tracks reading history for each displayed news post.
   - Premium news has limited visibility for non-subscribed users.

5. **Details News Post**

   - Separate page displaying detailed information about a post.
   - Details include description, likes, shares, like button, and share button.
   - Shows recommended news based on user likes.
   - Limited post visibility for non-subscribed users.

6. **Get Subscription Plan Payment**

   - Users can buy a subscription for one month or a year to become a premium user.
   - Payment is made via generated QR code.
   - Redirects to display an invoice and success dialog upon successful payment.
   - Redirects to the order/payment page with a failure dialog if payment fails.

7. **My Profile Menu**
   - Displays personal information, including name, username, email, phone number, and address.

## Getting Started

Follow these steps to set up and run the application locally.

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure the necessary environment variables.
4. Run the application using `npm run start`.
5. Run the database using `npm run start:db`.
6. if you want to use database online change env to `https://db-news-inky.vercel.app`
7. if you want to payment, you must connect with same wifi between your laptop and your handphone
8. Then update the '/src/components/modal/modalSubs' and env database, update it to your hostname
9. To check your IP Address, you can use 'hostname -I'
10. Access the application through the provided URL.

## Deployment

1. database : `https://db-news-inky.vercel.app`
2. website:
