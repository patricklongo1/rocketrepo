import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import api from '../../services/api';
import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  Filter,
  Issues,
  PagesContainer,
  PButton,
  NButton,
} from './styles';

export default class Repository extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repo: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filter: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repo);
    const { filter, page } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues?page=${page}`, {
        params: {
          state: filter,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      filter,
      page,
    });
  }

  async componentDidUpdate(_, prevState) {
    const { filter, repository, page } = this.state;

    if (prevState.filter !== filter || prevState.page !== page) {
      const [repo, issues] = await Promise.all([
        api.get(`/repos/${repository.full_name}`),
        api.get(`/repos/${repository.full_name}/issues?page=${page}`, {
          params: {
            state: filter,
          },
        }),
      ]);

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        repository: repo.data,
        issues: issues.data,
        loading: false,
        filter,
        page,
      });
    }
  }

  handleInputChange = e => {
    this.setState({ filter: e.target.value });
  };

  handlePrevButton = () => {
    let { page } = this.state;
    if (page > 1) {
      page -= 1;
    }
    this.setState({
      page,
    });
  };

  handleNextButton = () => {
    let { page } = this.state;
    page += 1;
    this.setState({
      page,
    });
  };

  render() {
    const { repository, issues, loading, page } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Issues>
          <h1>Issues</h1>
          <Filter onChange={this.handleInputChange}>
            <option value="all">Todos</option>
            <option value="open">Abertos</option>
            <option value="closed">Fechados</option>
          </Filter>
        </Issues>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <PagesContainer>
          <PButton
            onClick={this.handlePrevButton}
            firstPage={page <= 1 ? 1 : 0}
          >
            <FaArrowAltCircleLeft />
          </PButton>
          <NButton onClick={this.handleNextButton}>
            <FaArrowAltCircleRight />
          </NButton>
        </PagesContainer>
      </Container>
    );
  }
}
