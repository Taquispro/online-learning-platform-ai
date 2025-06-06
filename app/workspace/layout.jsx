import WorkSpaceProvider from "./provider";

function WorkSpaceLayout({ children }) {
  return (
    <div>
      <WorkSpaceProvider>{children}</WorkSpaceProvider>
    </div>
  );
}

export default WorkSpaceLayout;
