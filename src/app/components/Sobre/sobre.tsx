import { Button } from "@/components/ui/button";
import { Heart, Shield, Users } from "lucide-react"
import { deflate } from "zlib"


const Sobre = () =>{

    return(
        <div className="flex mt-60 px-9">
            <div className="w-full">
                <h2 className="text-5xl font-bold mb-5">Tempor consectetur ullamco ut in occaecat in</h2>

                <p>Veniam officia fugiat quis ex Lorem ad ullamco non aliquip aliqua proident. Enim eu fugiat nulla est ullamco ad et esse sit commodo eiusmod. Non eiusmod veniam eiusmod consequat aute enim in laborum et. Dolore occaecat magna do reprehenderit voluptate duis excepteur sint ad ullamco dolor ut. Anim eu commodo consequat dolore nisi laborum consequat cupidatat laboris ad esse fugiat.</p>

                <div className="flex gap-10 mt-5">
                    <Button className="bg-[#dba952] text-[20px] h-11 hover:bg-gray-100">Marque uma consulta</Button>
                    <Button className="bg-transparent text-[20px] h-11 text-[#dba952] border-2">Saiba Mais</Button>
                </div>

                <div className="flex gap-[250px] mt-10 justify-center">
                    <div>
                        <Heart />
                        <span>oiie</span>
                    </div>
                    <div>
                        <Shield />
                        <span>oiie</span>
                    </div>
                    <div>
                        <Users />
                        <span>oiie</span>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="w-40 bg-amber-300">
                    <div className="bg-white">
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Sobre;