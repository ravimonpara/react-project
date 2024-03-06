let Base= () => "https://www.theeasylearnacademy.com/shop";
export default function getBase() 
{   
    return Base() +"/ws/";
}
export function getImgBase()
{
    return  Base() + "/images/";
}