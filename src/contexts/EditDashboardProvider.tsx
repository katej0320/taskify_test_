import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../api/axios";
import { useEditPagination } from "../hooks/useEditPagination";

const EditContext = createContext({
  isBebridge: null,
  isMembers: null,
  isInvitations: null,
  memberPage: 0,
  invitePage: 0,
  handlePrevClick: (e: React.MouseEvent<HTMLButtonElement>) => {},
  handleNextClick: (e: React.MouseEvent<HTMLButtonElement>) => {},
});

export function EditProvider({
  children,
  dashboardId,
}: {
  children: ReactNode;
  dashboardId: string | string[] | undefined;
}) {
  const [values, setValues] = useState({
    isBebridge: null,
    isMembers: null,
    isInvitations: null,
  });

  const { memberPage, invitePage, handlePrevClick, handleNextClick } =
    useEditPagination();

  async function getDashboardDetail() {
    const res = await axiosInstance.get(`/dashboards/${dashboardId}`);
    const bebridge = res.data;

    setValues((prevValues) => ({
      ...prevValues,
      isBebridge: bebridge,
    }));
  }

  async function getMembers() {
    const res = await axiosInstance.get(
      `/members?dashboardId=${dashboardId}&page=${memberPage}&size=4`
    );
    const members = res.data;

    setValues((prevValues) => ({
      ...prevValues,
      isMembers: members,
    }));
  }

  async function getInvitations() {
    const res = await axiosInstance.get(
      `/dashboards/${dashboardId}/invitations?page=${invitePage}&size=4`
    );
    const invitaions = res.data;

    setValues((prevValues) => ({
      ...prevValues,
      isInvitations: invitaions,
    }));
  }

  useEffect(() => {
    if (dashboardId) {
      getDashboardDetail();
      getMembers();
      getInvitations();
    }
  }, [dashboardId, memberPage, invitePage]);

  return (
    <EditContext.Provider
      value={{
        isBebridge: values.isBebridge,
        isMembers: values.isMembers,
        isInvitations: values.isInvitations,
        memberPage,
        invitePage,
        handlePrevClick,
        handleNextClick,
      }}
    >
      {children}
    </EditContext.Provider>
  );
}

export function useEdit() {
  const context = useContext(EditContext);

  if (!context) {
    throw new Error("반드시 EditDashboardProvider 안에서 사용해야 합니다.");
  }

  return context;
}
