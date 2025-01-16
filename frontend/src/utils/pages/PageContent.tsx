const PageContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 items-start flex-col overflow-y-auto gap-4">
      {children}
    </div>
  )
}
export default PageContent
