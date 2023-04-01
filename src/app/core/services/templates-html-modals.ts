import { VisitCloseInterface } from '../../shared/models/shared.model';

export const errorModalHtml = (message: string) => `
<div class="card border-danger">
  <div class="d-flex">
    <div class="col-2 row">
      <img style="height: 50px; width: 70px;" src="assets/img/logo_2.png" alt="logo">
    </div>
    <div class="col-10 row">
      <h2 class="text-danger my-auto">Procuradoria Geral do Município</h2>
    </div>
  </div>
 </div>
<div class="card mt-3 bg-danger border-0 text-light" style="--bs-text-opacity: .9;">
  <div class="col-12 row p-2">
    <h3 class="fw-semibold my-auto">SGA - ERRO</h3>
  </div>
</div>
<div class="card border-danger mt-3 p-3">
  <div class="col-12 row">
    <h2 class="text-center mb-0">${message}.</h2>
      <span>Tente novamente.</span>
  </div>
</div>
`;

export const modalRemoveVisitHtml = (data: {
  id: string;
  visitorName: string;
}) => `
  <div class="card border-primary">
    <div class="d-flex">
      <div class="col-2 row">
        <img style="height: 50px; width: 70px;" src="assets/img/logo_2.png" alt="logo">
      </div>
      <div class="col-10 row">
        <h2 class="text-primary my-auto">Procuradoria Geral do Município</h2>
      </div>
    </div>
  </div>
  <div class="card mt-3 bg-danger border-0 text-light" style="--bs-text-opacity: .9;">
            <div class="col-12 row p-2">
              <h3 class="fw-semibold my-auto">SGA - EXCLUIR VISITANTE</h3>
            </div>
  </div>
  <div class="card border-primary mt-3 pt-3">
    <div class="col-12 row">
      <span class="text-danger">ATENÇÃO! Ao excluir o visitante também serão excluídos
        todos os atendimentos a ele vinculados.</span>
      <span class="mt-2">Confirma a exclusão de:</span>
      <h2 class="text-center">${data.visitorName}?</h2>
    </div>
  </div>
  `;

export const modalTokenExpiredHtml = (message: string) => `
<div class="card border-info">
  <div class="d-flex">
    <div class="col-2 row">
      <img style="height: 50px; width: 70px;" src="assets/img/logo_2.png" alt="logo">
    </div>
    <div class="col-10 row">
      <h2 class="text-info my-auto">Procuradoria Geral do Município</h2>
    </div>
  </div>
</div>
<div class="card mt-3 bg-info border-0 text-dark" style="--bs-text-opacity: .9;">
  <div class="col-12 row p-2">
    <h3 class="fw-semibold my-auto">SGA - SESSÃO EXPIROU</h3>
  </div>
</div>
<div class="card border-info mt-3 p-3">
  <div class="col-12 row">
    <h2 class="text-center">${message}</h2>
  </div>
</div>
 `;

export const modalVisitActiveHtml = (
  name: string,
  badge: string,
  secretary: string
) => `
<div class="card border-primary">
  <div class="d-flex">
    <div class="col-2 row">
      <img style="height: 50px; width: 70px;" src="assets/img/logo_2.png" alt="logo">
    </div>
    <div class="col-10 row">
      <h2 class="text-primary my-auto">Procuradoria Geral do Município</h2>
    </div>
  </div>
</div>
<div class="card mt-3 bg-primary border-0 text-light" style="--bs-text-opacity: .9;">
  <div class="col-12 row p-2">
    <h3 class="fw-semibold my-auto">SGA - ATENDIMENTO ATIVO</h3>
  </div>
</div>
<div class="card border-primary mt-3 p-3">
  <div class="col-12 row">
    <h2 class="text-center">${name}</h2>
    <span>Secretaria: ${secretary.toUpperCase()}</span>
    <br>
    <span>Crachá: ${badge}</span>
  </div>
</div>
`;

export const modalFinalizeVisitHtml = (data: VisitCloseInterface) => `
<div class="card border-primary">
  <div class="d-flex">
    <div class="col-2 row">
      <img style="height: 50px; width: 70px;" src="assets/img/logo_2.png" alt="logo">
    </div>
    <div class="col-10 row">
      <h2 class="text-primary my-auto">Procuradoria Geral do Município</h2>
    </div>
  </div>
</div>
<div class="card mt-3 bg-primary border-0 text-light" style="--bs-text-opacity: .9;">
  <div class="col-12 row p-2">
    <h3 class="fw-semibold my-auto">SGA - ENCERRAR ATENDIMENTO</h3>
  </div>
</div>
<div class="card border-primary mt-3 pt-3">
  <div class="col-12 row">
    <span>Finalizar o atendimento para:</span>
    <h2 class="text-center">${data.nameVisitor}?</h2>
  </div>
</div>
        `;
