import { Sequelize } from "sequelize-typescript";
import User from "../User";
import Queue from "../Queue";
import Whatsapp from "../Whatsapp";
import Contact from "../Contact";
import Ticket from "../Ticket";
import Message from "../Message";
import QuickAnswer from "../QuickAnswer";
import Setting from "../Setting";
import ContactCustomField from "../ContactCustomField";

const currentTenantId: { value: number | null } = { value: null };

export const setCurrentTenant = (tenantId: number) => {
  currentTenantId.value = tenantId;
};

export const getCurrentTenant = (): number | null => {
  return currentTenantId.value;
};

/**
 * Nota: Para usar scopes globales automáticos, necesitarías:
 * 1. Sequelize custom getters/hooks
 * 2. O usar middleware que siempre agregue tenantId a las queries
 *
 * Por ahora, este archivo solo mantiene el estado del tenant actual
 * que puede usarse en los servicios para filtrar queries manualmente.
 */
