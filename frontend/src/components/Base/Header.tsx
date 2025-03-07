function Header() {
    return (
        <div className="h-[56px] mb-[6px] p-[12px] flex items-center justify-between">
            <a href={"https://github.com/Babytiann"} target={"_blank"} className="py-[6px] px-[12px]">
                <span className="text-xl font-bold text-[#5D5D5D]">MeowTalk</span>
            </a>
            <a href={"https://github.com/Babytiann"} target={"_blank"} className="size-[36px]">
                <img src={"../../assets/img/克鲁鲁.jpg"} alt="avatar" className="object-contain rounded-full"/>
            </a>
        </div>
    )
}

export default Header