import SearchField from "@/components/SearchField";

export default async function Home() {
  return (
    // Main class below is responsible for setting background color for the Post screen section
    // Setting to Flex-Col for testing
    <main className="flex w-full min-w-0 flex-col gap-5">
      <div className="w-full min-w-0 space-y-5 flex justify-center items-center my-20">
        <div className="w-80 min-w-80">
          <h2 className="my-8 text-2xl text-center">Welcome to Banker Solution</h2>
          <SearchField />
        </div>
      </div>
    </main>
  );
}
