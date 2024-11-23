// "use client";
// import React, { useEffect, useState, ReactElement, useCallback } from "react";
// import { ls } from "@/@core/action/localStorage";

// interface LsContainerProps {
//   children: ReactElement<{ lsValue: any }> | ReactElement<{ lsValue: any }>[];
//   parentKey?: string;
// }

// const LsContainer: React.FC<LsContainerProps> = ({
//   children,
//   parentKey = "nextpersist",
// }) => {
//   const [lsValue, setLsValue] = useState<Record<string, any>>({});

//   const getPersist = useCallback(() => {
//     const data = ls.getAll(parentKey);
//     setLsValue(data);
//   }, [parentKey]);

//   useEffect(() => {
//     getPersist();
//   }, [getPersist]);

//   return (
//     <div>
//       {React.Children.map(children, (child) =>
//         React.isValidElement(child)
//           ? React.cloneElement(child, { lsValue })
//           : child
//       )}
//     </div>
//   );
// };

// export default LsContainer;
