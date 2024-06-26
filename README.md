# Fucking spaghetti code
<img src="assets/images/Security.png" alt="Security"></img>
## Features:
- At least one unintended exploit
- Unmaintainable spaghetti code
- Top-notch security features (example above)
- RegExp based search
- \<2 years load times
- Unintuitive, unresponsive UI
- Barely working login system
- Chance to get copyright struck by OLX
## How to run:
1. Clone the repository
2. `cd` into cloned repository
3. Install necessary dependencies: `npm i`
4. Rename `.env.template` to `.env` and fill it with necessary info
5. Remove files with errors (if any)
6. Run project: `npm run start`
## Where to get info for `.env`:
- `DATABASE_URL`: https://www.prisma.io/docs/orm/overview/databases/mysql#connection-url
- `JOKE_FEATURES`: `true` or `false`, depends on what you want
- `AUTH_SECRET`: any string (used for encrypting JWT tokens)
- `AUTH_GITHUB_*`: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app
- `AUTH_GOOGLE_*`: https://support.google.com/cloud/answer/6158849?hl=en
- `AUTH_DISCORD_*`: https://discord.com/developers/docs/topics/oauth2
- `AUTH_APPLE_*`: https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/configuring_your_webpage_for_sign_in_with_apple
- `RESEND_API_KEY`: https://resend.com/api-keys
- `SELF_URL`: Self explanatory, use default (`http://localhost:3000`) during development
- `VERIFICATION_EMAIL`: Leave default (`onboarding@resend.dev`) if you didn't connect domain to `resend.com` account (You'll be limited to sending emails only to email you used to create resend account), otherwise use any email from your domain
## How to prepare database:
1. `cd` into cloned repository
2. run command `npm run generate`
3. a) run command `npm run pushtodb` (recommended)<br>b) execute script `sql/SCRIPT.sql` on user with sufficient permissions
## Development notes:
**How to run raw SQL in Prisma:**
```ts
db.$queryRaw<Type>`QUERY`;
```
**How to add field to user to retrieve it using `useSession()`:**<br>
`@/session.ts`:
```ts
async session ( { token, session }: { token: JWT, session: { user: AdapterUser } & AdapterSession & Session } )
{
  ...
  
  if ( token.customField && session.user )
    session.user.customField = token.customField;
  
  ...
},
async jwt ( { token }: { token: JWT } ): Promise<JWT>
{
  ...
  
  token.customField = existingUser.customField;
  
  ...
},
```
`@/next-session.d.ts`:
```ts
export type ExtendedUser = DefaultSession["user"] & {
  ...
  
  customField: Type;
  
  ...
}

...

declare module "@session/core/jwt"
{
  interface JWT
  {
    ...
    
    customField: Type;
    
    ...
  }
}
```
**What's the meaning of life**:
```
There is none
```