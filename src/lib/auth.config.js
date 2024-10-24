export const authConfig={
    pages:{
        signIn:"/login",
    },
    providers:[],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id=user.id
                token.name=user.username
            }
            return token;
        },
        async session({session,token}){
            if(token){
                session.user.id=token.id
            }
            return session
        }
    },
    authorized({ auth, request }) {
        const user = auth?.user;
        const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
        const isOnRegisterPage = request.nextUrl?.pathname.startsWith("/register");
        const isOnMainPage=request.nextUrl?.pathname.startsWith("/")
  
        if (isOnMainPage && !user) {
          return false;
        }

        if (isOnLoginPage && user) {
          return Response.redirect(new URL("/", request.nextUrl));
        }
  
        return true
    },
}