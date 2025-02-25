import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, updateUser } from '@/lib/actions/user.action'
import { NextResponse } from 'next/server'
import { deleteUser } from '@/lib/actions/user.action'
 
export async function POST(req: Request) {
 

  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
 

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
 
 
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }
 
  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);
 

  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt: WebhookEvent
 
 
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }
 
 
  const eventType = evt.type;
 
 if (eventType === 'user.created'){
    const {id, email_addresses, username, image_url, first_name, last_name } = evt.data

    //create new user in data base

    const mongoUser = await createUser({
      clerkId: id,
      name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
      username: username!,
      email: email_addresses[0].email_address,
      picture: image_url,
    })

    return NextResponse.json({message: 'OK' , user: mongoUser})
 } 
 
 if (eventType === 'user.updated'){
    const {id, email_addresses, username, image_url, first_name, last_name } = evt.data

    //update user in data base

    const mongoUser = await updateUser({
       clerkId: id,
       updateData: {
        name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
        username: username!,
        email: email_addresses[0].email_address,
        picture: image_url,
      },
       path: `/profile/${id}`,
      })

    return NextResponse.json({message: 'OK' , user: mongoUser})
 }

 if (eventType === 'user.deleted') {
    const { id } = evt.data;
       const deletedUser = await deleteUser({
         clerkId: id!,
       })

       return NextResponse.json({message: 'OK' , user: deletedUser})  
 }
 
 
   return NextResponse.json({ message: "OK" });
}
 