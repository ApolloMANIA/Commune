import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { qunit } from "globals";
import { Volume2 } from "lucide-react";
import { validators } from "tailwind-merge";

const Auth = () => {

    // Input Components
    const [email, setEmail] = useState("")
    //const [password, setPassword] = useState("")
    //const [confrimPassword, setConfirmPassword] = useState("")

    return(
         <div className="h-[100vh] w-[100vw] flex items-center justify-center">
                <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:[60vw] roundeed-3xl grid xl:grid-cols-2">
                    <div className="flex flex-col gap-10 items-center justify-center">
                        <div className="flex items-center justify-center flex-col">
                            <div className="flex items-center justify-center">
                                <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
                                <img src={Volume2} alt="Emoji" className="h-[100px]"/>
                            </div>
                            <p className="font-medium text -cneter">
                                Fill in the details to get started
                            </p>
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <Tabs className="w-3/4">
                                <TabsList className='bg-transparent rounded-none w-full'>
                                    <TabsTrigger 
                                        value="login" 
                                        className="data-[state=active]:bg-transparent
                                         text-black text-opacity-90 border-b-2 rounded-none
                                          w-full data-[state=active]:text-black 
                                          data-[state=active];font-semibold
                                         data-[state=active]:border-b-purple-500 
                                         p-3 transition-all duration-300">Login</TabsTrigger>

                                    <TabsTrigger value="signup"
                                    className="data-[state=active]:bg-transparent
                                         text-black text-opacity-90 border-b-2 rounded-none
                                          w-full data-[state=active]:text-black 
                                          data-[state=active];font-semibold
                                         data-[state=active]:border-b-purple-500 
                                         p-3 transition-all duration-300">SignUp</TabsTrigger>
                                </TabsList>
                                <TabsContent className="flex flex-col gap-5 mt-10" value="login"><Input 
                                        placeholder="Email"
                                        type="email"
                                        className="rounded-ful p-6"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    /></TabsContent>
                                <TabsContent className="" value="signup"></TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default Auth;